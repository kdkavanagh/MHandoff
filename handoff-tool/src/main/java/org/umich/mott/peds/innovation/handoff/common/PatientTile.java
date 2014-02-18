package org.umich.mott.peds.innovation.handoff.common;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
public class PatientTile {
  private final String idNum, name, dateOfBirth, location;
  private final String picBase64;
  private int numNotes = 0, numTasks = 0, numAlerts = 0;

  private transient int level = 0;

  public PatientTile(String idNum, String name, String dateOfBirth, String location, String picBase64, int numNotes, int numTasks, int numAlerts, int level) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.location = location;
    this.idNum = idNum;
    this.picBase64 = picBase64;
    this.numNotes = numNotes;
    this.numTasks = numTasks;
    this.numAlerts = numAlerts;
    this.level = level;
  }

}
