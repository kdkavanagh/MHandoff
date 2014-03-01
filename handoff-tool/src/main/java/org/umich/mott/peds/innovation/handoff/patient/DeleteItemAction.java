package org.umich.mott.peds.innovation.handoff.patient;

import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param noteId - The noteID of the note to delete
 * 
 */
@ActionMapping(path = "patient/deleteItem.do")
public class DeleteItemAction extends CRUDAction {

  @Override
  public String delete(ActionContext context) throws Exception {
    return null;
  }

}
