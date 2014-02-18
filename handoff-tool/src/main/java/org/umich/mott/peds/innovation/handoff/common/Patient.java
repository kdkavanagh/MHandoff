package org.umich.mott.peds.innovation.handoff.common;

import java.util.ArrayList;
import java.util.HashMap;

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

  public BasicInfo getBasicInfo() {
    return basicInfo;
  }

  public void setBasicInfo(BasicInfo basicInfo) {
    this.basicInfo = basicInfo;
  }

  public LabInfo getLabs() {
    return labs;
  }

  public void setLabs(LabInfo labs) {
    this.labs = labs;
  }

  public MedsInfo getMeds() {
    return meds;
  }

  public void setMeds(MedsInfo meds) {
    this.meds = meds;
  }

  public AllergyInfo getAllergies() {
    return allergies;
  }

  public void setAllergies(AllergyInfo allergies) {
    this.allergies = allergies;
  }

  public static class BasicInfo {

    public final String idNum, name, dateOfBirth, location;

    public BasicInfo(String idNum, String name, String dateOfBirth, String location) {
      this.idNum = idNum;
      this.name = name;
      this.dateOfBirth = dateOfBirth;
      this.location = location;
    }

  }

  public static class LabInfo extends HashMap<String, Double> {
  }

  public static class MedsInfo extends HashMap<String, Double> {
  }

  public static class AllergyInfo extends ArrayList<String> {
  }

}
