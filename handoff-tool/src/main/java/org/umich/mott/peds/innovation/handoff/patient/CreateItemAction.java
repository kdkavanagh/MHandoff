package org.umich.mott.peds.innovation.handoff.patient;

import javax.servlet.ServletException;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Task;
import org.umich.mott.peds.innovation.handoff.common.WriteResult;

/**
 * Create an item in the patient's record
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
@ActionMapping(method = RequestMethod.POST, path = "patient/create.do")
public class CreateItemAction implements Action {

  private static final Logger logger = Logger.getLogger(CreateItemAction.class);

  public String execute(ActionContext context) throws Exception {
    String id = context.getParameterOrFail("patient");
    String type = context.getParameterOrFail("type");
    BaseNote note;
    if (type.equals("note")) {
      logger.info("Received request to create new note");
      // Assemble note
      note = new BaseNote(context);
    } else if (type.equals("task")) {
      logger.info("Received request to create new task");
      // Assemble task
      note = new Task(context);
    } else {
      throw new ServletException("Unknown type " + type);
    }
    persistenceService.writeItem(id, note);
    return gson.toJson(new WriteResult("success"));
  }

}
