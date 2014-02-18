package org.umich.mott.peds.innovation.handoff.common;

public enum TaskStatus {
  NOTSTARTED("Not Started"),
  INPROGRESS("In Progress"),
  COMPLETED("Completed");

  private final String text;

  private TaskStatus(String s) {
    text = s;
  }

  @Override
  public String toString() {
    return text;
  }
}
