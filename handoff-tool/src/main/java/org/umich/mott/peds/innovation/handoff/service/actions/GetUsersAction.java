package org.umich.mott.peds.innovation.handoff.service.actions;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 25, 2014
 * 
 */
@ActionMapping(method = RequestMethod.GET, path = "user/list.do")
public class GetUsersAction implements Action {

  public String execute(ActionContext context) throws Exception {
    return null;
  }

}
