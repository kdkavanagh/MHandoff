/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Wrapper class for HttpServletRequest/Response to simplify access to
 * request/response methods
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public class ActionContext {

  private final HttpServletRequest request;

  private final HttpServletResponse response;

  private final String path;

  public ActionContext(final HttpServletRequest req, final HttpServletResponse resp, String path) {
    request = req;
    response = resp;
    this.path = path;
  }

  public HttpServletRequest getRequest() {
    return request;
  }

  public HttpServletResponse getResponse() {
    return response;
  }

  public void postMessageToStream(Stream.Message msg) {
    Stream s = (Stream)
        this.request.getSession().getAttribute(Stream.class.getName());
    if (s != null) {
      s.sendMessageToOtherClients(msg);
    } else {
      // This user isnt using the stream (maybe they dont support websockets)
      Stream.sendMessageToAllClients(msg);
    }
  }

  /**
   * Store a object in a user's session
   * 
   * @param key
   * @param value
   * @param request
   */
  public void storeInSession(String key, Object value) {
    request.getSession().setAttribute(key, value);
  }

  /**
   * Get an object from a user's session
   * 
   * @param key
   * @param request
   * @return
   */
  public Object getFromSession(String key) {
    return request.getSession().getAttribute(key);
  }

  /**
   * Attempt to get a parameter from the http request
   * 
   * @param key
   * @param request
   * @return the value associated with this parameter
   * @throws ServletException
   *           if parameter is not found in the request
   */
  public String getParameterOrFail(String key) throws ServletException {
    String result = request.getParameter(key);
    if (result == null) {
      StringBuilder sb = new StringBuilder();
      for (String param : request.getParameterMap().keySet()) {
        sb.append(param).append(", ");
      }
      throw new ServletException("Request does not contain parameter " + key + ". Parameters: " + sb.toString());
    }
    return result;
  }

  /**
   * Attempt to get a parameter from the http request
   * 
   * @param key
   * @param request
   * @return the value associated with this parameter or null
   */
  public String getParameter(String key) {
    return request.getParameter(key);
  }

  public String getPath() {
    return path;
  }
}
