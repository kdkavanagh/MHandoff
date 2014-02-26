package org.umich.mott.peds.innovation.handoff.common;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 26, 2014
 * 
 */
public class User {

  private final String uniqname, first, last;

  public User(String uniqname, String first, String last) {
    this.uniqname = uniqname;
    this.first = first;
    this.last = last;
  }

  public String getUniqname() {
    return uniqname;
  }

  public String getFirst() {
    return first;
  }

  public String getLast() {
    return last;
  }
}
