package org.umich.mott.peds.innovation.handoff.service.actions;

import java.util.List;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;
import org.umich.mott.peds.innovation.handoff.common.Pair;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 25, 2014
 * 
 */
@ActionMapping(method = RequestMethod.GET, path = "backchannel/priority.do")
public class GetPriorityLevelsAction implements Action {

  public String execute(ActionContext context) throws Exception {
    List<Pair<Integer, String>> l = persistenceService.getPriorityLevels();
    JsonObjectBuilder builder = Json.createObjectBuilder();
    for (Pair<Integer, String> p : l) {
      builder.add(p.first.toString(), p.second);
    }
    return builder.build().toString();
  }

}
