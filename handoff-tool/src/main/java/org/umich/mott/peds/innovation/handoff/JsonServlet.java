/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;

import javax.json.JsonObject;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Servlet that facilitates returning a JSON response to the client. JSON
 * Response must be set using setResponse()
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public abstract class JsonServlet extends HttpServlet {

  private boolean responseSet = false;

  private static final Logger logger = Logger.getLogger(JsonServlet.class);

  @Override
  public final void doGet(HttpServletRequest request, HttpServletResponse response) {
    response.setContentType("application/json");
    handleGet(request, response);
    if (!responseSet) {
      logger.error("No JSON response was ever set.");
    }
  }

  @Override
  public final void doPost(HttpServletRequest request, HttpServletResponse response) {
    response.setContentType("application/json");
    handlePost(request, response);
    if (!responseSet) {
      logger.error("No JSON response was ever set.");
    }
  }

  protected void setResponse(final JsonObject json, HttpServletResponse response) throws IOException {
    setResponse(json.toString(), response);
  }

  protected void setResponse(final String json, HttpServletResponse response) throws IOException {
    response.getOutputStream().print(json);
    response.getOutputStream().close();
    logger.debug("JSON Response set.");
    responseSet = true;
  }

  public abstract void handleGet(HttpServletRequest request, HttpServletResponse response);

  public abstract void handlePost(HttpServletRequest request, HttpServletResponse response);
}
