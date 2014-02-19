package org.umich.mott.peds.innovation.handoff.patient;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.ErrorCode;
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
@ActionMapping(method = RequestMethod.POST, path = "patient/createItem.do")
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
      throw new RuntimeException("Failure: Unknown type " + type);
    }

    boolean result = persistenceService.writeItem(id, note);
    if (result) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_WRITE_ITEM.json();
    }
  }

}
