/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Kyle D. Kavanagh
 * 
 */
@WebServlet(name = "Hello World Servlet", description = "This is a simple hello world servlet with annotations", urlPatterns = "/hello")
public class HelloServlet extends SimpleServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String name = request.getParameter("name");
		storeInSession("Request Name", name, request);
		// Write the response
		out.println("Hello  " + name);
		out.close();
	}
}
