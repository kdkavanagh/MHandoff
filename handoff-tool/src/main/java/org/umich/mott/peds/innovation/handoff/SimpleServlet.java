/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * 
 * Class that abstracts out some of the nuances of working with servlets
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 16, 2014
 * 
 */
public class SimpleServlet extends HttpServlet {

	public void storeOnInSession(String key, Object value, HttpServletRequest request) {
		request.getSession().setAttribute(key, value);
	}
}
