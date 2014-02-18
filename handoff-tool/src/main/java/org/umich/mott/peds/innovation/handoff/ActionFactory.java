/**
 * 
 */
package org.umich.mott.peds.innovation.handoff;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.reflections.Reflections;

/**
 * Map request url's to specific actions
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public final class ActionFactory {
	protected static final Map<String, Action> mappings = new HashMap<String, Action>();
	private static final Logger logger = Logger.getLogger(ActionFactory.class);

	static {
		// Initialize the mappings
		Reflections reflections = new Reflections(ActionFactory.class.getPackage().getName());
		Set<Class<?>> actionClasses = reflections.getTypesAnnotatedWith(ActionMapping.class);
		for (Class<?> clazz : actionClasses) {
			try {
				// Check to make sure this is actually an Action
				if (!Action.class.isAssignableFrom(clazz)) {
					logger.error(clazz.getName() + " is not an implementation of Action.class");
				} else {
					createMapping((Action) clazz.newInstance());
				}
			} catch (Exception e) {
				logger.error("Could not map Action class " + clazz.getCanonicalName(), e);
			}
		}
	}

	public static Action getAction(String method, HttpServletRequest request) {
		String req = method + request.getServletPath();
		Action a = mappings.get(req);
		if (a == null) {
			throw new RuntimeException("No action available for request " + req);
		}
		return a;
	}

	private static void createMapping(Action action) {
		// Get the url info from the annotation
		String method = action.getClass().getAnnotation(ActionMapping.class).method();
		String path = action.getClass().getAnnotation(ActionMapping.class).path();
		if (!path.startsWith("/")) {
			path = "/" + path;
		}
		String key = method + path;
		if (!key.endsWith(".do")) {
			key += ".do";
		}
		logger.debug("Mapping URL " + key + " to action " + action.getClass().getCanonicalName());
		mappings.put(key, action);
	}

}
