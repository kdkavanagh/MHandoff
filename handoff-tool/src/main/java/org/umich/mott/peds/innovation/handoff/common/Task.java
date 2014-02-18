package org.umich.mott.peds.innovation.handoff.common;

import javax.servlet.ServletException;

import org.umich.mott.peds.innovation.handoff.ActionContext;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class Task extends BaseNote {

  public Task(String taskId, String text, String reporter, String assignee, String reportedDate, String expiration, PriorityLevel priority) {
    super(taskId, text, reporter, reportedDate, expiration, priority);
    this.assignee = assignee;
    status = TaskStatus.NOTSTARTED;

  }

  public Task(ActionContext context) throws ServletException {
    super(context);
    assignee = context.getParameterOrFail("assignee");
    status = TaskStatus.valueOf(context.getParameterOrFail("status"));
  }

  private final String assignee;

  private final TaskStatus status;

}
