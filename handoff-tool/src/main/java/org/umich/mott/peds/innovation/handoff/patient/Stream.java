package org.umich.mott.peds.innovation.handoff.patient;

import java.io.IOException;
import java.util.Set;

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
import org.umich.mott.peds.innovation.handoff.GetHttpSessionConfigurator;

import com.google.gson.Gson;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 28, 2014
 * 
 */
@ServerEndpoint(value = "/streaming", configurator = GetHttpSessionConfigurator.class)
public class Stream implements HttpSessionBindingListener {

  public static final String STREAM = "stream";

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
    logger.trace("Received msg " + msg);
  }

  public static synchronized void sendMessageToAllClients(Message msg) {

    logger.info("Sending message to all listeners");
    for (Session client : clients) {
      if (client.isOpen() && client.isSecure()) {
        try {
          client.getBasicRemote().sendText(gson.toJson(msg));
        } catch (IOException e) {
          logger.error("Failed to send message to a client");
        }

      }
    }
  }

  public void sendMessageToOtherClients(Message msg) {
    logger.info("Sending message to other listeners");
    logger.info("Message: " + gson.toJson(msg));
    for (Session client : clients) {
      if (client != this.ourSession && client.isOpen() && client.isSecure()) {
        try {
          client.getBasicRemote().sendText(gson.toJson(msg));
        } catch (IOException e) {
          logger.error("Failed to send message to a client");
        }
      }
    }

  }

  @OnOpen
  public void open(Session session, EndpointConfig config) throws IOException {
    logger.info("New connection to stream");
    this.ourSession = session;
    clients.add(session);
    this.ourHttpSession = (HttpSession) config.getUserProperties()
        .get(HttpSession.class.getName());
    this.ourHttpSession.setAttribute(STREAM, this);
  }

  @OnClose
  public void onClose(Session session) {
    // Remove session from the connected sessions set
    clients.remove(session);
    this.ourHttpSession.removeAttribute(STREAM);
  }

  public void valueBound(HttpSessionBindingEvent event) {
    // Nothing to do
  }

  public void valueUnbound(HttpSessionBindingEvent event) {
    // The session was invalidated or our stream was removed from the session.
    // Close the connection.
    try {
      this.ourSession.close();
    } catch (IOException e) {
      logger.error("Unable to close session");
    }
  }

}
