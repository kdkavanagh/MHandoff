package org.umich.mott.peds.innovation.handoff;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Mar 2, 2014
 * 
 */
public class GetHttpSessionConfigurator extends ServerEndpointConfig.Configurator
{

  @Override
  public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
    HttpSession httpSession = (HttpSession) request.getHttpSession();
    config.getUserProperties().put(HttpSession.class.getName(), httpSession);
  }
}