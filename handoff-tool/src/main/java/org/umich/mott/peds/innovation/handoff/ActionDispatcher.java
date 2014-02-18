/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * The primary servlet to communicate with the client. Actions are generated by
 * the ActionFactory and executed after receiving a GET or POST request
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@WebServlet(name = "Dispatcher Servlet", description = "Servlet to provide communication with the client", urlPatterns = "*.do")
public class ActionDispatcher extends JsonServlet {

  private static final long serialVersionUID = 1L;
  private static final Logger logger = Logger.getLogger(ActionDispatcher.class);

  @Override
  public void handleGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    logger.info("Received new GET action request");
    handle(request, response);
  }

  @Override
  public void handlePost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    logger.info("Received new POST action request");
    handle(request, response);
  }

  private void handle(HttpServletRequest request, HttpServletResponse response) throws ServletException {
    try {
      String resp = ActionFactory.getAction(request).execute(new ActionContext(request, response));
      setResponse(resp, response);
    } catch (Exception e) {
      throw new ServletException("Executing action failed.", e);
    }
  }

}
