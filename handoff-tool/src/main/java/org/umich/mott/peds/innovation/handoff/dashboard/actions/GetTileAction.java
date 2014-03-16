/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.PatientTile;

/**
 * Get all the necessary info for a individual patient tile on the homepage
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 * @param patient
 *          - Patient ID
 * 
 */
@ActionMapping(path = "dashboard/patientInfo.do")
public class GetTileAction extends CRUDAction {

  @Override
  public String read(ActionContext context) throws Exception {
    String id = context.getParameterOrFail("patient");
    PatientTile tile = persistenceService.getPatientTile(id);
    return CRUDAction.gson.toJson(tile);

  }

}
