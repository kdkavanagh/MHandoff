/**
 * 
 */
package org.umich.mott.peds.innovation.handoff.dashboard;

import org.umich.mott.peds.innovation.handoff.ActionFactory;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.AddPatientAction;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.DeletePatientAction;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.GetTileAction;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public class DashboardActionFactory extends ActionFactory {

	@Override
	public void initMappings() {
		mappings.put("GET/patientInfo", new GetTileAction());
		mappings.put("POST/addPatient", new AddPatientAction());
		mappings.put("POST/deletePatient", new DeletePatientAction());
	}

}
