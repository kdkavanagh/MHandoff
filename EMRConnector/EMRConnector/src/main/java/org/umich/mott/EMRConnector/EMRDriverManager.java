package org.umich.mott.EMRConnector;

import org.apache.log4j.Logger;

public class EMRDriverManager {

  private static EMRDriver driver = null;

  public static void register(EMRDriver connector) {
    Logger.getLogger(EMRDriverManager.class).debug("Loaded EMRDriver " + connector.getClass().getCanonicalName());
    driver = connector;
  }

  public static EMRDriver getDriver() {

    if (driver == null) {
      throw new RuntimeException("No EMRConnector initialized.");
    }
    return driver;
  }
}
