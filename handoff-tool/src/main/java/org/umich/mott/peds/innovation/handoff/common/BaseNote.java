package org.umich.mott.peds.innovation.handoff.common;

import javax.servlet.ServletException;

import org.umich.mott.peds.innovation.handoff.ActionContext;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class BaseNote {

  private String noteId;

  private final String text, reporter, reportedDate, expiration;

  private final String priority;

  public BaseNote(String noteId, String text, String reporter, String reportedDate, String expiration, String priority) {
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
    this.priority = context.getParameterOrFail("priority");

  }

  public String getNoteId() {
    return noteId;
  }

  public void setNoteId(String noteId) {
    this.noteId = noteId;
  }

  public boolean equals(BaseNote n) {
    if (noteId == null && n.noteId == null) {
      return true;
    }
    return noteId.equals(n.noteId);
  }
}
