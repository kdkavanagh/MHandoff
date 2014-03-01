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

  protected static final Map<String, CRUDAction> mappings = new HashMap<String, CRUDAction>();

  private static final Logger logger = Logger.getLogger(ActionFactory.class);

  static {
    // Initialize the mappings
    Reflections reflections = new Reflections(ActionFactory.class.getPackage().getName());
    Set<Class<?>> actionClasses = reflections.getTypesAnnotatedWith(ActionMapping.class);
    for (Class<?> clazz : actionClasses) {
      try {
        // Check to make sure this is actually an Action
        if (!CRUDAction.class.isAssignableFrom(clazz)) {
          logger.error(clazz.getName() + " is not an implementation of CRUDAction.class");
        } else {
          createMapping((CRUDAction) clazz.newInstance());
        }
      } catch (Exception e) {
        logger.error("Could not map Action class " + clazz.getCanonicalName(), e);
      }
    }
  }

  public static CRUDAction getAction(HttpServletRequest request) {
    String req = request.getServletPath();
    CRUDAction a = mappings.get(req);
    if (a == null) {
      throw new RuntimeException("No action available for request " + req);
    }
    return a;
  }

  private static void createMapping(CRUDAction action) {
    // Get the url info from the annotation
    String path = action.getClass().getAnnotation(ActionMapping.class).path();
    if (!path.startsWith("/")) {
      path = "/" + path;
    }

    if (!path.endsWith(".do")) {
      path += ".do";
    }
    logger.debug("Mapping URL " + path + " to action " + action.getClass().getCanonicalName());
    mappings.put(path, action);
  }

}
