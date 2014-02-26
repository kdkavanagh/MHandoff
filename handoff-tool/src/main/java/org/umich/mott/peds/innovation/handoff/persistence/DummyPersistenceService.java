package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Patient.AllergyInfo;
import org.umich.mott.peds.innovation.handoff.common.Patient.BasicInfo;
import org.umich.mott.peds.innovation.handoff.common.Patient.LabInfo;
import org.umich.mott.peds.innovation.handoff.common.Patient.MedInfo;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.gson.Gson;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class DummyPersistenceService implements PersistenceService {

  private static final Logger logger = Logger.getLogger(DummyPersistenceService.class);

  private static final Random r = new Random(19580427);

  private static final Boolean randomlyFailWrites = true;

  private static Boolean result() {
    if (randomlyFailWrites) {
      return r.nextBoolean();
    }
    else {
      return true;
    }
  }

  private final List<BaseNote> notes = new ArrayList<BaseNote>();

  private final List<Task> tasks = new ArrayList<Task>();

  @Inject
  public DummyPersistenceService() {

    notes.add(new BaseNote("1", "TEST This is important", "Kyle Kavanagh", "02/18/2014", "02/20/2014", "P1"));
    notes.add(new BaseNote("2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "02/10/2014",
        "02/20/2014", "P1"));
    notes
        .add(new BaseNote(
            "6",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada fringilla enim et eleifend. Nam vitae leo dignissim, porta justo ut, scelerisque tortor. Duis lacus leo, malesuada in malesuada et, lacinia ac est. Duis a metus sit amet felis vehicula iaculis ut a enim. Nulla facilisis consectetur risus a adipiscing. Quisque eget elit in neque facilisis vulputate vel eget urna. In hac habitasse platea dictumst. Cras ac blandit nisi. Suspendisse id laoreet ante, nec facilisis purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec faucibus tristique urna, non tristique sem ultrices ut. Suspendisse sit amet nulla sed diam cursus euismod id et nunc.",
            "Kyle Kavanagh", "02/11/2014", "02/21/2014",
            "P1"));

    notes.add(new BaseNote("3", "Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "02/19/2014", "02/20/2014", "P1"));
    notes.add(new BaseNote("4", "Aliquam in magna urna", "Kyle Kavanagh", "02/18/2014", "02/20/2014", "P1"));
    notes.add(new BaseNote("5", "Class aptent taciti sociosqu ad litora torquent per conubia nostra", "Kyle Kavanagh", "02/11/2014", "02/21/2014",
        "P1"));

    tasks.add(new Task("T1", "This is an important task", "Kyle Kavanagh", "Minchan Kim", "Working", "02/18/2014", "02/20/2014", "P1"));
    tasks.add(new Task("T2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "Minchan Kim", "Working", "02/10/2014",
        "02/20/2014", "P1"));
    tasks
        .add(new Task("T3", "Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "Minchan Kim", "Working", "02/19/2014", "02/20/2014",
            "P1"));

    notes.add(new BaseNote("7", "Test new", "Kyle Kavanagh", "02/11/2014", "02/21/2014", "P1"));
  }

  public List<BaseNote> getNotesForPatient(String id) {

    return notes;
  }

  public List<Task> getTasksForPatient(String id) {
    return tasks;
  }

  public Patient getPatient(String id) {
    Patient p = new Patient();
    p.setBasicInfo(new BasicInfo(id, "Kyle Kavanagh", "06/20/1992", "Bed 1234"));
    AllergyInfo allergyInfo = new AllergyInfo();
    allergyInfo.add("Allergy x");
    allergyInfo.add("Allergy y");
    allergyInfo.add("Allergy z");
    p.setAllergies(allergyInfo);
    LabInfo l = new LabInfo();
    l.put("Na", 0.2);
    l.put("Cl", 12.2);
    l.put("BUN", 10.0);
    l.put("Glucose", 98.4);
    l.put("K", 30.6);
    l.put("HCO", 3.6);
    l.put("Cret", 12.1);
    p.setLabs(l);
    List<MedInfo> meds = new ArrayList<MedInfo>();
    meds.add(new MedInfo("MedX", 43.2));
    meds.add(new MedInfo("MedY", 1.0));
    meds.add(new MedInfo("MedZ", 23.2));

    p.setMeds(meds);

    return p;
  }

  public boolean writeItem(String patientId, BaseNote note) {
    Gson gson = new Gson();
    String res = gson.toJson(note);
    logger.info("Writing Object " + res);
    note.setNoteId("123");
    if (note instanceof Task) {
      tasks.add((Task) note);
    } else {
      notes.add(note);
    }
    return result();
  }

  public boolean deleteItem(String noteId) {
    logger.info("Deleting note " + noteId);
    BaseNote n = new BaseNote(noteId, null, null, null, null, null);
    tasks.remove(n);
    notes.remove(n);
    return result();
  }
}
