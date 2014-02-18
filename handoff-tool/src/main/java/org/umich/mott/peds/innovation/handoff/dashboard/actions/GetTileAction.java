/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;

/**
 * Get all the necessary info for a individual patient tile on the homepage
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 * @param patient
 *          - Patient ID
 * @param level
 *          - the amount of information to get from the server
 * 
 */
@ActionMapping(method = RequestMethod.GET, path = "dashboard/patientInfo.do")
public class GetTileAction implements Action {

  public String execute(ActionContext context) throws Exception {
    String id = context.getParameterOrFail("patient");
    int detailLevel = Integer.parseInt(context.getParameterOrFail("level"));
    // Go to the database
    // format the data and return
    JsonObjectBuilder b = Json.createObjectBuilder();
    b.add("PatientID", id);
    b.add("detail", detailLevel);
    return b.build().toString();

  }

}
