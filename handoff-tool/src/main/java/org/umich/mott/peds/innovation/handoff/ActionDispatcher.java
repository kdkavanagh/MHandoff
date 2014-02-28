package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
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
public class ActionDispatcher extends HttpServlet {

  private static final long serialVersionUID = 1L;

  private static final Logger logger = Logger.getLogger(ActionDispatcher.class);

  protected void setJsonResponse(final String json, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().print(json);
    response.getOutputStream().close();
    logger.debug("JSON Response set.");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) {
    logger.info("Received new GET action request");
    try {
      String resp = ActionFactory.getAction(request).read(new ActionContext(request, response));
      if (resp != null) {
        setJsonResponse(resp, response);
      }
    } catch (Exception e) {
      try {
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      } catch (IOException e2) {
        logger.error("IOException caught during response. Cannot send a response",
            e2);
      }
      logger.error("Caught exception during Action dispatch for URL " + request.getRequestURI(), e);
    }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) {
    logger.info("Received new POST action request");
    try {
      String resp = ActionFactory.getAction(request).create(new ActionContext(request, response));
      if (resp != null) {
        setJsonResponse(resp, response);
      }
    } catch (Exception e) {
      try {
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      } catch (IOException e2) {
        logger.error("IOException caught during response. Cannot send a response",
            e2);
      }
      logger.error("Caught exception during Action dispatch for URL " + request.getRequestURI(), e);
    }
  }

  @Override
  public void doPut(HttpServletRequest request, HttpServletResponse response) {
    logger.info("Received new POST action request");
    try {
      String resp = ActionFactory.getAction(request).update(new ActionContext(request, response));
      if (resp != null) {
        setJsonResponse(resp, response);
      }
    } catch (Exception e) {
      try {
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      } catch (IOException e2) {
        logger.error("IOException caught during response. Cannot send a response",
            e2);
      }
      logger.error("Caught exception during Action dispatch for URL " + request.getRequestURI(), e);
    }
  }

  @Override
  public void doDelete(HttpServletRequest request, HttpServletResponse response) {
    logger.info("Received new POST action request");
    try {
      String resp = ActionFactory.getAction(request).delete(new ActionContext(request, response));
      if (resp != null) {
        setJsonResponse(resp, response);
      }
    } catch (Exception e) {
      try {
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      } catch (IOException e2) {
        logger.error("IOException caught during response. Cannot send a response",
            e2);
      }
      logger.error("Caught exception during Action dispatch for URL " + request.getRequestURI(), e);
    }
  }

}
