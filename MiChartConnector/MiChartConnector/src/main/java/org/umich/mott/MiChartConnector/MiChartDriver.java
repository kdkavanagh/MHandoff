package org.umich.mott.MiChartConnector;

import org.umich.mott.EMRConnector.EMRDriver;
import org.umich.mott.EMRConnector.EMRDriverManager;

public class MiChartDriver implements EMRDriver
{

  static {
    EMRDriverManager.register(new MiChartDriver());
  }

}
