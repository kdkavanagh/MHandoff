package org.umich.mott.peds.innovation.handoff.common;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class PatientTile {

  private final Patient.BasicInfo basicInfo;

  private final String picBase64;

  private final int numNotes, numTasks;

  public PatientTile(Patient.BasicInfo info, String picBase64, int numNotes, int numTasks) {
    this.basicInfo = info;
    this.picBase64 = picBase64;
    this.numNotes = numNotes;
    this.numTasks = numTasks;
  }

  public Patient.BasicInfo getBasicInfo() {
    return basicInfo;
  }

  public String getPicBase64() {
    return picBase64;
  }

  public int getNumNotes() {
    return numNotes;
  }

  public int getNumTasks() {
    return numTasks;
  }
}
