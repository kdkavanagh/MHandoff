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
@ActionMapping(method = RequestMethod.GET, path = "backchannel/pull.do")
public class LoadAppInfoAction implements Action {

  public String execute(ActionContext context) throws Exception {
    JsonObjectBuilder builder = Json.createObjectBuilder();

    // get the priority levels
    List<Pair<Integer, String>> pLevels = persistenceService.getPriorityLevels();

    JsonObjectBuilder priorityLevels = Json.createObjectBuilder();
    for (Pair<Integer, String> p : pLevels) {
      priorityLevels.add(p.first.toString(), p.second);
    }

    // get the task status levels
    List<Pair<Integer, String>> tLevels = persistenceService.getTaskStatuses();

    JsonObjectBuilder taskLevels = Json.createObjectBuilder();
    for (Pair<Integer, String> p : tLevels) {
      taskLevels.add(p.first.toString(), p.second);
    }

    builder.add("priorityLevels", priorityLevels);
    builder.add("taskStatuses", taskLevels);
    return builder.build().toString();
  }

}
