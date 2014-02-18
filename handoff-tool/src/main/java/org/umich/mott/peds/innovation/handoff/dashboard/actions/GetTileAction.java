/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard.actions;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.umich.mott.peds.innovation.handoff.ServletAction;

/**
 * Get all the necessary info for a individual patient tile on the homepage
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 * @param patient
 *            - Patient ID
 * @param level
 *            - the amount of information to get from the server
 * 
 */
public class GetTileAction extends ServletAction {

	public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = getParameterOrFail("patient", request);
		int detailLevel = Integer.parseInt(getParameterOrFail("level", request));
		// Go to the database
		// format the data and return
		JsonObjectBuilder b = Json.createObjectBuilder();
		b.add("PatientID", id);
		b.add("detail", detailLevel);
		return b.build().toString();

	}

}
