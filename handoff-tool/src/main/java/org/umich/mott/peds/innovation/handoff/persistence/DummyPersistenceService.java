package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.ArrayList;
import java.util.List;

import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.PriorityLevel;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class DummyPersistenceService implements PersistenceService {

  @Inject
  public DummyPersistenceService() {
  }

  public List<BaseNote> getNotesForPatient(String id) {
    List<BaseNote> tbr = new ArrayList<BaseNote>();
    tbr.add(new BaseNote("This is important", "Kyle Kavanagh", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new BaseNote("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "02/10/14",
        "02/20/14", PriorityLevel.TWO));
    tbr.add(new BaseNote("Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "02/19/14", "02/20/14", PriorityLevel.TWO));
    tbr.add(new BaseNote("Aliquam in magna urna", "Kyle Kavanagh", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new BaseNote("Class aptent taciti sociosqu ad litora torquent per conubia nostra", "Kyle Kavanagh", "02/11/14", "02/21/14", PriorityLevel.THREE));
    return tbr;
  }

  public List<Task> getTasksForPatient(String id) {
    List<Task> tbr = new ArrayList<Task>();
    tbr.add(new Task("This is an important task", "Kyle Kavanagh", "Minchan Kim", "02/18/14", "02/20/14", PriorityLevel.ONE));
    tbr.add(new Task("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Kyle Kavanagh", "Minchan Kim", "02/10/14",
        "02/20/14", PriorityLevel.TWO));
    tbr.add(new Task("Aliquam id nibh in libero mattis iaculis non at odio.", "Kyle Kavanagh", "Minchan Kim", "02/19/14", "02/20/14", PriorityLevel.TWO));
    return tbr;
  }

}
