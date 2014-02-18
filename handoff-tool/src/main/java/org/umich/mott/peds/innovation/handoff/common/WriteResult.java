package org.umich.mott.peds.innovation.handoff.common;

/**
 * Class to report back to the client if the write/update was a success
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class WriteResult {

  private final String message;

  public WriteResult(String message) {
    this.message = message;
  }
}
