package org.umich.mott.peds.innovation.handoff.common;

public enum PriorityLevel {
  ONE(1),
  TWO(2),
  THREE(3);

  private int level;

  private PriorityLevel(int level) {
    this.level = level;
  }

  public static PriorityLevel fromInt(int in) {
    for (PriorityLevel l : PriorityLevel.values()) {
      if (l.toInt() == in) {
        return l;
      }
    }
    return null;
  }

  public int toInt() {
    return level;
  };
}
