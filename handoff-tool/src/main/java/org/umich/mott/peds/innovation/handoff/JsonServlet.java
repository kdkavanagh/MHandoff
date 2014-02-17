/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;

import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public abstract class JsonServlet extends SimpleServlet {

	private boolean responseSet = false;

	@Override
	public final void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		handleGet(request, response);
		if (!responseSet) {
			throw new RuntimeException("No JSON response was ever set.");
		}
	}

	@Override
	public final void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		handlePost(request, response);
		if (!responseSet) {
			throw new RuntimeException("No JSON response was ever set.");
		}
	}

	protected void setResponse(final JsonObject json, HttpServletResponse response) throws IOException {
		response.getOutputStream().print(json.toString());
		response.getOutputStream().close();
		responseSet = true;
	}

	public abstract void handleGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;

	public abstract void handlePost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
}
