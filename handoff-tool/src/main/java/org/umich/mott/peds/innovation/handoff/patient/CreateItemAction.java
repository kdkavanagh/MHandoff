package org.umich.mott.peds.innovation.handoff.patient;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.ErrorCode;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.gson.Gson;

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
@ActionMapping(path = "patient/createItem.do")
public class CreateItemAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(CreateItemAction.class);

  @Override
  public String create(ActionContext context) throws Exception {

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

    // boolean result = persistenceService.writeItem(id, note);
    Gson gson = new Gson();
    NoteStream.sendMessageToAllClients("Patient,notes", gson.toJson(note));
    if (true) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_WRITE_ITEM.json();
    }
  }

}
