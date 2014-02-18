package org.umich.mott.peds.innovation.handoff.common;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class Task extends BaseNote {

  public Task(String text, String reporter, String assignee, String reportedDate, String expiration, PriorityLevel priority) {
    super(text, reporter, reportedDate, expiration, priority);
    this.assignee = assignee;
    status = TaskStatus.NOTSTARTED;

  }

  private final String assignee;

  private final TaskStatus status;

}
