package org.umich.mott.peds.innovation.handoff.patient;

import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param patient - patient id
 * 
 */
@ActionMapping(path = "patient/info.do")
public class GetPatientInfoAction extends CRUDAction {

  @Override
  public String read(ActionContext context) throws Exception {
    return gson.toJson(persistenceService.getPatientTile(context.getParameterOrFail("patient")));
  }

}
