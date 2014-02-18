package org.umich.mott.peds.innovation.handoff;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public interface Action {
	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
