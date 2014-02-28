/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@ActionMapping(path = "dashboard/addPatient.do")
public class AddPatientAction extends CRUDAction {

  @Override
  public String create(ActionContext context) throws Exception {
    String id = context.getParameterOrFail("patientid");
    // go to db and find id and delete
    return null;
  }

}
