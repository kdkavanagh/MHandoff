package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.List;

import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Task;
import org.umich.mott.peds.innovation.handoff.common.User;

import com.google.inject.ImplementedBy;

/**
 * Interface for the persistence layer
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */

// @ImplementedBy(DummyPersistenceService.class)
@ImplementedBy(PersistenceServiceImpl.class)
public interface PersistenceService {

  public List<BaseNote> getNotesForPatient(String id);

  public BaseNote getNoteById(String noteId);

  public List<Task> getTasksForPatient(String id);

  public Task getTaskById(String taskId);

  public void writeNote(BaseNote note);

  public void writeTask(Task task);

  public void deleteNote(String noteId);

  public void deleteTask(String taskId);

  public Patient getPatient(String id);

  public List<Pair<Integer, String>> getPriorityLevels();

  public List<Pair<Integer, String>> getTaskStatuses();

  public List<User> getAllUsers();

}
