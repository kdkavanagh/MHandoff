package org.umich.mott.peds.innovation.handoff.patient;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Task;

/**
 * Create an item in the patient's record
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param patient - the patient to create this item for
 * @request.param type - the type of note to create, note or task
 * 
 * 
 */
@ActionMapping(path = "patient/task.do")
public class TaskAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(TaskAction.class);

  @Override
  public String create(ActionContext context) throws Exception {
    logger.info("Request to create new task");
    String id = persistenceService.writeTask(new Task(context), false);
    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();

  }

  @Override
  public String read(ActionContext context) throws Exception {
    BaseNote n = persistenceService.getTaskById(context.getParameterOrFail("noteId"));
    return gson.toJson(n);
  }

  @Override
  public String update(ActionContext context) throws Exception {
    logger.info("Request to update task " + context.getParameterOrFail("noteId"));
    String id = persistenceService.writeTask(new Task(context), true);
    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();
  }

  @Override
  public String delete(ActionContext context) throws Exception {
    logger.info("Request to delete task " + context.getParameterOrFail("noteId"));
    persistenceService.deleteTask(context.getParameterOrFail("noteId"));
    return null;
  }
}
