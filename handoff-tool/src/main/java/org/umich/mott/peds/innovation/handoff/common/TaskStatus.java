package org.umich.mott.peds.innovation.handoff.common;

public enum TaskStatus {
  NOTSTARTED {
    @Override
    public String toString() {
      return "Not Started";
    }
  },
  INPROGRESS {
    @Override
    public String toString() {
      return "In Progress";
    }
  },
  COMPLETED {
    @Override
    public String toString() {
      return "Completed";
    }
  };
}
