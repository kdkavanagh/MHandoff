package org.umich.mott.peds.innovation.handoff;

import com.google.gson.Gson;

/**
 * Actions are provide code that runs when an associated request is received by
 * the ActionDispatcher
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
public interface Action {

  /**
   * 
   * @param context
   * @return the JSON response
   * @throws Exception
   */
  public String execute(ActionContext context) throws Exception;

  public static final Gson gson = new Gson();
}
