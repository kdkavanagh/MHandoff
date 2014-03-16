/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import java.util.List;

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
@ActionMapping(path = { GetTileAction.SINGLE_TILE_PATH, GetTileAction.ALL_TILES_PATH })
public class GetTileAction extends CRUDAction {

  public static final String SINGLE_TILE_PATH = "dashboard/tiles/patient.do";

  public static final String ALL_TILES_PATH = "dashboard/tiles/list.do";

  @Override
  public String read(ActionContext context) throws Exception {

    if (context.getPath().equals(GetTileAction.SINGLE_TILE_PATH)) {
      String id = context.getParameterOrFail("patient");
      PatientTile tile = persistenceService.getPatientTile(id);
      return CRUDAction.gson.toJson(tile);
    } else {
      Boolean activePatientsOnly = Boolean.parseBoolean(context.getParameterOrFail("activeOnly"));
      List<PatientTile> tile = persistenceService.getAllPatientTiles(context.getUser(), activePatientsOnly);
      return CRUDAction.gson.toJson(tile);
    }

  }

}
