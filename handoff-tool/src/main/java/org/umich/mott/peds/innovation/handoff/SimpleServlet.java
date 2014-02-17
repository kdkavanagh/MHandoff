/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * Class that abstracts out some of the nuances of working with servlets
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 16, 2014
 * 
 */
public class SimpleServlet extends HttpServlet {

	public void storeInSession(String key, Object value, HttpServletRequest request) {
		request.getSession().setAttribute(key, value);
	}
	
}
