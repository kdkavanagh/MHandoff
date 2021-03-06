package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.eclipse.jetty.util.ConcurrentHashSet;

import com.google.gson.Gson;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 28, 2014
 * 
 */
@ServerEndpoint(value = "/streaming", configurator = GetHttpSessionConfigurator.class)
public class Stream implements HttpSessionBindingListener {

  private static final ExecutorService executorService = Executors.newSingleThreadExecutor();

  private static final Logger logger = Logger.getLogger(Stream.class);

  /**
   * Set of all the sessions
   */
  private static final Set<Session> clients = new ConcurrentHashSet<Session>();

  private Session ourSession;

  private HttpSession ourHttpSession;

  private static final Gson gson = new Gson();

  public static class Message {

    String topic;

    Object message;

    public Message(String topic, Object message) {
      this.topic = topic;
      this.message = message;
    }
  }

  @OnMessage
  public void onMessage(String msg, Session session)
      throws IOException {
  }

  public static void sendMessageToAllClients(final Message msg) {
    // Send message in new thread
    executorService.submit(new Runnable() {

      public void run() {
        logger.info("Sending message to all listeners");
        for (Session client : clients) {
          synchronized (client) {
            if (client.isOpen() && client.isSecure()) {
              try {
                client.getBasicRemote().sendText(gson.toJson(msg));
              } catch (IOException e) {
                logger.error("Failed to send message to a client");
              }
            }
          }
        }
      }
    });

  }

  public void sendMessageToOtherClients(final Message msg) {
    // Send message in new thread
    executorService.submit(new Runnable() {

      public void run() {
        logger.info("Sending message to " + (clients.size() - 1) + " other listeners. Skipping session " + Stream.this.ourHttpSession.getId());
        logger.debug("Message: " + gson.toJson(msg));
        synchronized (Stream.this.ourSession) {
          for (Session client : clients) {
            if (client != Stream.this.ourSession) {
              synchronized (client) {
                if (client.isOpen() && client.isSecure()) {
                  try {
                    client.getBasicRemote().sendText(gson.toJson(msg));
                  } catch (IOException e) {
                    logger.error("Failed to send message to a client");
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  @OnOpen
  public void open(Session session, EndpointConfig config) throws IOException {
    logger.debug("New connection to stream");
    session.setMaxIdleTimeout(Long.MAX_VALUE);
    this.ourSession = session;
    clients.add(session);
    this.ourHttpSession = (HttpSession) config.getUserProperties()
        .get(HttpSession.class.getName());
    this.ourHttpSession.setAttribute(Stream.class.getName(), this);
  }

  @OnClose
  public void onClose(Session session) {
    // Remove session from the connected sessions set
    clients.remove(session);
    this.ourHttpSession.removeAttribute(Stream.class.getName());
  }

  public void valueBound(HttpSessionBindingEvent event) {
    // Nothing to do
  }

  public void valueUnbound(HttpSessionBindingEvent event) {
    // The session was invalidated or our stream was removed from the session.
    // Close the connection.
    try {
      synchronized (this.ourSession) {
        this.ourSession.close();
      }
    } catch (IOException e) {
      logger.error("Unable to close session");
    }
  }

}
