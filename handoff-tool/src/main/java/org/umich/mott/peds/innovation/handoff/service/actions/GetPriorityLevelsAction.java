package org.umich.mott.peds.innovation.handoff.service.actions;

import java.util.List;

import javax.json.Json;
import javax.json.JsonArrayBuilder;

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
    JsonArrayBuilder builder = Json.createArrayBuilder();
    for (Pair<Integer, String> p : l) {
      builder.add(Json.createObjectBuilder()
          .add("value", p.first)
          .add("text", p.second));
    }
    return builder.build().toString();
  }

}
