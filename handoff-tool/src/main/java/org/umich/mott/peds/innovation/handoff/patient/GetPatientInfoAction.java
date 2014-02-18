package org.umich.mott.peds.innovation.handoff.patient;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
@ActionMapping(method = RequestMethod.GET, path = "patient/info.do")
public class GetPatientInfoAction implements Action {

  public String execute(ActionContext context) throws Exception {
    return gson.toJson(persistenceService.getPatient(context.getParameterOrFail("patient")));
  }

}
