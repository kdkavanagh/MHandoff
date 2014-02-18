package org.umich.mott.peds.innovation.handoff;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public abstract class ServletAction implements Action {

	protected final void storeInSession(String key, Object value, HttpServletRequest request) {
		request.getSession().setAttribute(key, value);
	}

	protected final Object getFromSession(String key, HttpServletRequest request) {
		return request.getSession().getAttribute(key);
	}

	protected final String getParameterOrFail(String key, HttpServletRequest request) throws ServletException {
		String result = request.getParameter(key);
		if (result == null) {
			throw new ServletException("Request does not contain parameter " + key);
		}
		return result;
	}
}