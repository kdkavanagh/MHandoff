package org.umich.mott.peds.innovation.handoff.patient;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;
import org.umich.mott.peds.innovation.handoff.common.ErrorCode;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param noteId - The noteID of the note to delete
 * 
 */
@ActionMapping(method = RequestMethod.POST, path = "patient/deleteItem.do")
public class DeleteItemAction implements Action {

  public String execute(ActionContext context) throws Exception {
    String noteId = context.getParameterOrFail("noteId");
    boolean result = persistenceService.deleteItem(noteId);
    if (result) {
      return ErrorCode.NO_ERROR.json();
    } else {
      return ErrorCode.UNABLE_TO_DELETE_ITEM.json();
    }
  }

}
