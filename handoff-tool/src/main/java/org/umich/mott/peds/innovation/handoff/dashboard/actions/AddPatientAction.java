/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@ActionMapping(method = RequestMethod.POST, path = "dashboard/addPatient.do")
public class AddPatientAction implements Action {

  public String execute(ActionContext context) throws Exception {
    String id = context.getParameterOrFail("patientid");
    // go to db and find id and delete
    return null;
  }

}
