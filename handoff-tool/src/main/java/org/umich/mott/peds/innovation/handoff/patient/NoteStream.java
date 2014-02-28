package org.umich.mott.peds.innovation.handoff.patient;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 28, 2014
 * 
 */
@ServerEndpoint("/noteStream")
public class NoteStream {

  private static final Logger logger = Logger.getLogger(NoteStream.class);

  private static Map<Session, String> subscriptions = new ConcurrentHashMap<Session, String>();

  private static Map<String, Set<Session>> clients = new ConcurrentHashMap<String, Set<Session>>();

  @OnMessage
  public void onMessage(String feed, Session session)
      throws IOException {
    // Subscribe to a feed
    logger.info("Subscription to " + feed + " received");
    if (!clients.containsKey(feed)) {
      clients.put(feed, new HashSet<Session>());
    }
    clients.get(feed).add(session);
    subscriptions.put(session, feed);

  }

  public static void sendMessageToAllClients(String feed, String msg) {
    if (clients.containsKey(feed)) {
      logger.info("Sending message to all listeners on feed " + feed);
      for (Session client : clients.get(feed)) {
        if (client.isOpen() && client.isSecure()) {
          try {
            client.getBasicRemote().sendText(msg);
          } catch (IOException e) {
            logger.error("Failed to send message to a client");
          }
        } else {
          // This client isnt open anymore.
          subscriptions.remove(client);
          clients.get(feed).remove(client);
        }
      }
    }

  }

  @OnOpen
  public void onOpen(Session session) {
    logger.info("New connection to NoteStream. Waiting to receive subscription message");
  }

  @OnClose
  public void onClose(Session session) {
    // Remove session from the connected sessions set
    String feed = subscriptions.get(session);
    subscriptions.remove(session);
    clients.get(feed).remove(session);
  }
}
