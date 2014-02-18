package org.umich.mott.peds.innovation.handoff.common;

import com.google.gson.Gson;

/**
 * Class to report back to the client if the write/update was a success
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class ErrorCode {

  private final String message;

  private final int code;

  public static final ErrorCode NO_ERROR = new ErrorCode(0, "success");

  public static final ErrorCode UNABLE_TO_WRITE_ITEM = new ErrorCode(2, "Unable to write Note or Task to database.");

  public static final ErrorCode UNABLE_TO_DELETE_ITEM = new ErrorCode(3, "Unable to delete Note or Task from database.");

  private static final Gson gson = new Gson();

  public ErrorCode(int code, String message) {
    this.code = code;
    this.message = message;
  }

  public String json() {
    return gson.toJson(this);
  }

  public String getMessage() {
    return message;
  }

  public int getCode() {
    return code;
  }
}
