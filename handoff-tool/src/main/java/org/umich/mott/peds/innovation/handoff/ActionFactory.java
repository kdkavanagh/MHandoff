/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.AddPatientAction;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.DeletePatientAction;
import org.umich.mott.peds.innovation.handoff.dashboard.actions.GetTileAction;

/**
 * Map requests to specific actions
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public class ActionFactory {
	protected static final Map<String, Action> mappings = new HashMap<String, Action>();
	private static final Logger logger = Logger.getLogger(ActionFactory.class);

	static {
		createMapping("GET", "dashboard/patientInfo", new GetTileAction());
		createMapping("POST", "dashboard/addPatient", new AddPatientAction());
		createMapping("POST", "dashboard/deletePatient", new DeletePatientAction());
	}

	public static Action getAction(HttpServletRequest request) {
		String req = request.getMethod() + request.getServletPath() + request.getPathInfo();
		Action a = mappings.get(req);
		if (a == null) {
			throw new RuntimeException("No action available for request " + req);
		}
		return a;
	}

	private static void createMapping(String method, String path, Action action) {
		String key = method + "/action/" + path;
		logger.debug("Mapping URL " + key + " to action " + action.getClass().getCanonicalName());
		mappings.put(key, action);
	}

}
