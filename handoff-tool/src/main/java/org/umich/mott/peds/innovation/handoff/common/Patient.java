package org.umich.mott.peds.innovation.handoff.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class Patient {

  private BasicInfo basicInfo;

  private LabInfo labs;

  private List<MedInfo> meds;

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

  public List<MedInfo> getMeds() {
    return meds;
  }

  public void setMeds(List<MedInfo> meds) {
    this.meds = meds;
  }

  public AllergyInfo getAllergies() {
    return allergies;
  }

  public void setAllergies(AllergyInfo allergies) {
    this.allergies = allergies;
  }

  public static class BasicInfo {

    public final String patientId, name, dateOfBirth, location;

    public BasicInfo(String idNum, String name, String dateOfBirth, String location) {
      this.patientId = idNum;
      this.name = name;
      this.dateOfBirth = dateOfBirth;
      this.location = location;
    }

    public BasicInfo(String idNum) {
      this(idNum, "N/A", "N/A", "N/A");
    }

  }

  public static class LabInfo extends HashMap<String, Double> {
  }

  public static class MedInfo {

    public MedInfo(String name, double amnt) {
      this.name = name;
      this.amnt = amnt;
    }

    String name;

    double amnt;
  }

  public static class AllergyInfo extends ArrayList<String> {
  }

}
