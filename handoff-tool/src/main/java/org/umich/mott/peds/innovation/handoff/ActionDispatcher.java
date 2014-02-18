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
 * The primary servlet to communicate with the client
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@WebServlet(name = "Dispatcher Servlet", description = "Servlet to provide communication with the client", urlPatterns = "/action/*")
public class ActionDispatcher extends JsonServlet {

	private static final Logger logger = Logger.getLogger(ActionDispatcher.class);

	@Override
	public void handleGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("Received new action request");
		try {
			String resp = ActionFactory.getAction(request).execute(request, response);
			setResponse(resp, response);
		} catch (Exception e) {
			throw new ServletException("Executing action failed.", e);
		}
	}

	@Override
	public void handlePost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		handleGet(request, response);
	}

}
