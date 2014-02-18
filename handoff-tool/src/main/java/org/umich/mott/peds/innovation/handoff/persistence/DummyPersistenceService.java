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
import org.umich.mott.peds.innovation.handoff.common.Patient.MedsInfo;
import org.umich.mott.peds.innovation.handoff.common.PriorityLevel;
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

  @Inject
  public DummyPersistenceService() {
  }

  public List<BaseNote> getNotesForPatient(String id) {
    List<BaseNote> tbr = new ArrayList<BaseNote>();
    tbr.add(new BaseNote("1", "This is important", "Kyle Kavanagh", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new BaseNote("2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "02/10/14",
        "02/20/14", PriorityLevel.TWO));
    tbr.add(new BaseNote("3", "Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "02/19/14", "02/20/14", PriorityLevel.TWO));
    tbr.add(new BaseNote("4", "Aliquam in magna urna", "Kyle Kavanagh", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new BaseNote("5", "Class aptent taciti sociosqu ad litora torquent per conubia nostra", "Kyle Kavanagh", "02/11/14", "02/21/14",
        PriorityLevel.THREE));
    return tbr;
  }

  public List<Task> getTasksForPatient(String id) {
    List<Task> tbr = new ArrayList<Task>();
    tbr.add(new Task("T1", "This is an important task", "Kyle Kavanagh", "Minchan Kim", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new Task("T2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "Minchan Kim", "02/10/14",
        "02/20/14", PriorityLevel.TWO));
    tbr.add(new Task("T3", "Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "Minchan Kim", "02/19/14", "02/20/14", PriorityLevel.TWO));
    return tbr;
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
    l.put("ValueX", 0.2);
    l.put("ValueY", 12.2);
    l.put("ValueS", 10.0);
    l.put("ValueQ", 98.4);
    l.put("ValueW", 30.6);
    p.setLabs(l);

    MedsInfo m = new MedsInfo();
    m.put("MedX", 43.2);
    m.put("MedY", 1.0);
    m.put("MedZ", 23.0);
    p.setMeds(m);

    return p;
  }

  public boolean writeItem(String patientId, BaseNote note) {
    Gson gson = new Gson();
    String res = gson.toJson(note);
    logger.info("Writing Object " + res);
    return result();
  }

  public boolean deleteItem(String noteId) {
    logger.info("Deleting note " + noteId);
    return result();
  }
}
