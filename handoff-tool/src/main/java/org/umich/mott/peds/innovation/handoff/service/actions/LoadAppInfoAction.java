package org.umich.mott.peds.innovation.handoff.service.actions;

import java.util.List;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.Action;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.RequestMethod;
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.User;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 25, 2014
 * 
 */
@ActionMapping(method = RequestMethod.GET, path = "bacckchannel/pull.do")
public class LoadAppInfoAction implements Action {

  private static final Logger logger = Logger.getLogger(LoadAppInfoAction.class);

  public String execute(ActionContext context) throws Exception {
    JsonObjectBuilder builder = Json.createObjectBuilder();
    logger.info("Backchannel request for application info received.");
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

    // get the list of users
    List<User> users = persistenceService.getAllUsers();
    JsonObjectBuilder userBuilder = Json.createObjectBuilder();

    for (User u : users) {
      userBuilder.add(u.getUniqname(), u.getFirst() + " " + u.getLast());
    }

    builder.add("priorityLevels", priorityLevels);
    builder.add("taskStatuses", taskLevels);
    builder.add("handoffUsers", userBuilder);
    return builder.build().toString();
  }

}
