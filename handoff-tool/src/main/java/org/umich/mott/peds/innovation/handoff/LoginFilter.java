package org.umich.mott.peds.innovation.handoff;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * @author Kyle D. Kavanagh
 * @date Apr 22, 2014
 * 
 */
@WebFilter("*")
public class LoginFilter implements Filter {

  private static final Logger logger = Logger.getLogger(LoginFilter.class);

  public void init(FilterConfig config) throws ServletException {
  }

  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) res;
    Principal user = request.getUserPrincipal();
    HttpSession session = request.getSession();

    if (user != null && session.getAttribute("user") == null) {
      session.setAttribute("user", user);
      // First-time login.
      if (request.getServletPath().endsWith(".do")) {
        // The user was trying to access a *.do servlet. Redirect to homepage
        logger.debug("Redirecting session " + session.getId() + " to homepage from context " + request.getServletPath());
        response.sendRedirect(request.getContextPath() + "/");
      } else {
        logger.debug("Not redirecting path " + request.getServletPath());
      }
    }
    chain.doFilter(req, res);

  }

  public void destroy() {
  }
}
