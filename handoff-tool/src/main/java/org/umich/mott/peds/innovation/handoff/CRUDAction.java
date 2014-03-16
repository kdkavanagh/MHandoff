package org.umich.mott.peds.innovation.handoff;

import org.umich.mott.peds.innovation.handoff.persistence.PersistenceService;

import com.google.gson.Gson;

/**
 * Actions are code that runs when an associated request is received by
 * the ActionDispatcher
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public class CRUDAction {

  /**
   * Handles GET requests
   * 
   * @param context
   * @return the JSON response
   * @throws Exception
   */
  public String read(ActionContext context) throws Exception {
    return null;
  }

  /**
   * Handles POST requests
   * 
   * @param context
   * @return the JSON response
   * @throws Exception
   */
  public String create(ActionContext context) throws Exception {
    return null;
  }

  /**
   * Handles PUT requests
   * 
   * @param context
   * @return the JSON response
   * @throws Exception
   */
  public String update(ActionContext context) throws Exception {
    return null;
  }

  /**
   * Handles DELETE requests
   * 
   * @param context
   * @return the JSON response
   * @throws Exception
   */
  public String delete(ActionContext context) throws Exception {
    return null;
  }

  public static final Gson gson = new Gson();

  public static final PersistenceService persistenceService = GuiceInjectorContainer.injector.getInstance(PersistenceService.class);

}
