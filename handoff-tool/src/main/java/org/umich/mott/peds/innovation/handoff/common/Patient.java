package org.umich.mott.peds.innovation.handoff.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class Patient {
  private BasicInfo basicInfo;
  private LabInfo labs;
  private MedsInfo meds;
  private AllergyInfo allergies;
  private final List<BaseNote> notes = new ArrayList<BaseNote>();
  private final List<Task> tasks = new ArrayList<Task>();

  public static class BasicInfo {
    private String idNum, name, dateOfBirth, location;
  }

  public static class LabInfo {
    private final Map<String, Double> labs = new HashMap<String, Double>();
  }

  public static class MedsInfo {
    private final Map<String, Double> meds = new HashMap<String, Double>();
  }

  public static class AllergyInfo {
    private final List<String> allergies = new ArrayList<String>();
  }

}
