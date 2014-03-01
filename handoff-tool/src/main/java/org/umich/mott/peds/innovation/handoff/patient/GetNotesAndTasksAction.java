package org.umich.mott.peds.innovation.handoff.patient;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param type - note or task
 * @request.param patient - patient id
 * 
 */
@ActionMapping(path = "patient/items/list.do")
public class GetNotesAndTasksAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(GetNotesAndTasksAction.class);

  @Override
  public String read(ActionContext context) throws Exception {
    String intent = context.getParameterOrFail("type");
    String id = context.getParameterOrFail("patient");
    if (intent.equals("note")) {
      logger.info("Received request for Notes");
      return gson.toJson(persistenceService.getNotesForPatient(id));
    } else if (intent.equals("task")) {
      logger.info("Received request for Tasks");
      return gson.toJson(persistenceService.getTasksForPatient(id));
    } else {
      throw new RuntimeException("Unknown intent " + intent);
    }

  }

}
