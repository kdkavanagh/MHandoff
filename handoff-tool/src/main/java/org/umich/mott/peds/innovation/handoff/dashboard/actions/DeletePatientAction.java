/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.ActionContext;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@ActionMapping(method = "POST", path = "dashboard/deletePatient.do")
public class DeletePatientAction implements Action {

	public String execute(ActionContext request) throws Exception {

		return null;
	}

}
