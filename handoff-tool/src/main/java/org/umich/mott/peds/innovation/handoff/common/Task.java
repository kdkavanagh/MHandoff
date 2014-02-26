package org.umich.mott.peds.innovation.handoff.common;

import javax.servlet.ServletException;

import org.umich.mott.peds.innovation.handoff.ActionContext;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class Task extends BaseNote {

  public Task(String taskId, String text, String reporter, String assignee, int status, String reportedDate, String expiration, int priorityCode) {
    super(taskId, text, reporter, reportedDate, expiration, priorityCode);
    this.assignee = assignee;
    this.status = status;

  }

  public Task(ActionContext context) throws ServletException {
    super(context);
    assignee = context.getParameterOrFail("assignee");
    status = Integer.parseInt(context.getParameterOrFail("status"));
  }

  private final String assignee;

  private final int status;

}
