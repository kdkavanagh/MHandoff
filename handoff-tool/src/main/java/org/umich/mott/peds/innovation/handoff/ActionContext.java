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

	public ActionContext(HttpServletRequest req, HttpServletResponse resp) {
		request = req;
		response = resp;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public HttpServletResponse getResponse() {
		return response;
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
	 *             if parameter is not found in the request
	 */
	public String getParameterOrFail(String key) throws ServletException {
		String result = request.getParameter(key);
		if (result == null) {
			throw new ServletException("Request does not contain parameter " + key);
		}
		return result;
	}
}
