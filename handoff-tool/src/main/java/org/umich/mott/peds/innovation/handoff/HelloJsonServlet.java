/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Example class for how to return json data
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@WebServlet(name = "Hello Json Servlet", description = "This is a simple Json servlet with annotations", urlPatterns = "/helloJson")
public class HelloJsonServlet extends JsonServlet {

  protected static final Logger logger = Logger.getLogger(HelloJsonServlet.class);

  @Override
  public void handleGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    JsonObjectBuilder b = Json.createObjectBuilder();
    logger.info("Received request for JSON response");
    b.add("name", request.getParameter("name"));
    b.add("class", "eecs481");
    b.add("sessionId", request.getSession().getId());
    b.add("programmingLangs",
        Json.createArrayBuilder()
            .add(Json.createObjectBuilder()
                .add("type", "backend")
                .add("name", "java"))
            .add(Json.createObjectBuilder()
                .add("type", "frontend")
                .add("name", "JavaScript")));
    setResponse(b.build(), response);
  }

  @Override
  public void handlePost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  }

}
