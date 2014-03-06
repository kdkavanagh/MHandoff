package org.umich.mott.peds.innovation.handoff.service.actions;

import java.util.List;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.User;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 25, 2014
 * 
 */
@ActionMapping(path = "backchannel/pull.do")
public class LoadAppInfoAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(LoadAppInfoAction.class);

  @Override
  public String read(ActionContext context) throws Exception {

    JsonObjectBuilder builder = Json.createObjectBuilder();
    logger.info("Backchannel request for application info received.");

    // get the logged in user
    JsonObjectBuilder userInfo = Json.createObjectBuilder();
    User user = persistenceService.getUser(context.getRequest().getUserPrincipal().getName());
    userInfo.add("uniqname", user.getUniqname());
    userInfo.add("first", user.getFirst());
    userInfo.add("last", user.getLast());

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

    builder.add("userInfo", userInfo);
    builder.add("priorityLevels", priorityLevels);
    builder.add("taskStatuses", taskLevels);
    builder.add("handoffUsers", userBuilder);
    return builder.build().toString();
  }

}
