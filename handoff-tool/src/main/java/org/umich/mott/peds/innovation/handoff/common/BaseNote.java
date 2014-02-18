package org.umich.mott.peds.innovation.handoff.common;

import javax.servlet.ServletException;

import org.umich.mott.peds.innovation.handoff.ActionContext;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class BaseNote {

  private final String noteId;

  private final String text, reporter, reportedDate, expiration;

  private final PriorityLevel priority;

  public BaseNote(String noteId, String text, String reporter, String reportedDate, String expiration, PriorityLevel priority) {
    this.text = text;
    this.reporter = reporter;
    this.reportedDate = reportedDate;
    this.expiration = expiration;
    this.priority = priority;
    this.noteId = noteId;
  }

  /**
   * Generate note from context
   * 
   * @param context
   * @throws ServletException
   */
  public BaseNote(ActionContext context) throws ServletException {
    noteId = context.getParameter("noteId");
    text = context.getParameterOrFail("text");
    reporter = context.getParameterOrFail("reporter");
    reportedDate = context.getParameterOrFail("reportedDate");
    expiration = context.getParameterOrFail("expiration");
    priority = PriorityLevel.valueOf(context.getParameterOrFail("priority"));
  }
}
