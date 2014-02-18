/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionFactory;
import org.umich.mott.peds.innovation.handoff.JsonServlet;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@WebServlet(name = "Dashboard Servlet", description = "Servlet to provide communication for the homepage dashboard", urlPatterns = "/dashboard/*")
public class DashboardServlet extends JsonServlet {

	private static final ActionFactory actionFactory = new DashboardActionFactory();

	private static final long serialVersionUID = 1L;

	private static final Logger logger = Logger.getLogger(DashboardServlet.class);

	@Override
	public void handleGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("New dashboard servlet request");
		try {
			String resp = actionFactory.getAction(request).execute(request, response);
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
