package org.umich.mott.peds.innovation.handoff.patient;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.ErrorCode;

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
@ActionMapping(path = "patient/note.do")
public class NoteAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(NoteAction.class);

  @Override
  public String create(ActionContext context) throws Exception {
    persistenceService.writeNote(new BaseNote(context), false);

    if (true) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_WRITE_ITEM.json();
    }
  }

  @Override
  public String read(ActionContext context) throws Exception {
    BaseNote n = persistenceService.getNoteById(context.getParameterOrFail("noteid"));
    return gson.toJson(n);
  }

  @Override
  public String update(ActionContext context) throws Exception {
    persistenceService.writeNote(new BaseNote(context), true);

    if (true) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_WRITE_ITEM.json();
    }
  }

  @Override
  public String delete(ActionContext context) throws Exception {
    persistenceService.deleteNote(context.getParameterOrFail("noteId"));

    if (true) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_WRITE_ITEM.json();
    }
  }

}
