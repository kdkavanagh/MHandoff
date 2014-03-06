package org.umich.mott.peds.innovation.handoff.service.actions;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * @author Kyle D. Kavanagh
 * @date Mar 6, 2014
 * 
 */
@WebServlet(name = "Logout Servlet", urlPatterns = "/logout")
public class LogoutAction extends HttpServlet {

  private static final Logger logger = Logger.getLogger(LogoutAction.class);

  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp) {
    logger.info("Logging out of user " + req.getUserPrincipal().getName());
    req.getSession().invalidate();
  }

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) {
    doGet(req, resp);
  }
}
