/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.ServletAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@ActionMapping(method = "POST", path = "dashboard/deletePatient.do")
public class DeletePatientAction extends ServletAction {

	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

		return null;
	}

}
