package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@ActionMapping(path = "dashboard/deletePatient.do")
public class DeletePatientAction extends CRUDAction {

  @Override
  public String delete(ActionContext context) throws Exception {

    return null;
  }

}
