package org.umich.mott.peds.innovation.handoff.common;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class BaseNote {

  private final String text, reporter, reportedDate, expiration;

  private final PriorityLevel priority;

  public BaseNote(String text, String reporter, String reportedDate, String expiration, PriorityLevel priority) {
    this.text = text;
    this.reporter = reporter;
    this.reportedDate = reportedDate;
    this.expiration = expiration;
    this.priority = priority;
  }

}
