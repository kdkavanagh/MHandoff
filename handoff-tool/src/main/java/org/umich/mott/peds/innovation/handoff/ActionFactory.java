/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * Map requests to specific actions
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public abstract class ActionFactory {
	protected final Map<String, ServletAction> mappings = new HashMap<String, ServletAction>();

	public ActionFactory() {
		initMappings();
	}

	public Action getAction(HttpServletRequest request) {
		String req = request.getMethod() + request.getPathInfo();
		Action a = mappings.get(req);
		if (a == null) {
			throw new RuntimeException("No action available for request " + req);
		}
		return a;
	}

	public abstract void initMappings();
}
