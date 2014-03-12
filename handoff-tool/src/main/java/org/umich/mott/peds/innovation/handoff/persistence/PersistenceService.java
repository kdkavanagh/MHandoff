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

  /**
   * 
   * @param id
   *          - Patient's ID
   * @param getExpired
   *          - Should expired notes be returned as well?
   * @return A list of all notes for the given patientId
   */
  public List<BaseNote> getNotesForPatient(String id, boolean getExpired);

  /**
   * 
   * @param noteId
   * @return the note associated with noteId
   */
  public BaseNote getNoteById(String noteId);

  /**
   * 
   * @param id
   *          - Patient's ID
   * @param getExpired
   *          - Should expired notes be returned as well?
   * @return a list of all tasks for the given patientId
   */
  public List<Task> getTasksForPatient(String id, boolean getExpired);

  /**
   * 
   * @param taskId
   * @return the task associated with the taskId
   */
  public Task getTaskById(String taskId);

  /**
   * Write the note to the database. Update note if already exists
   * 
   * @param note
   * @param update
   *          - if true, an SQL UPDATE query will be used. Else, INSERT
   * @return the ID of the note that was affected
   */
  public String writeNote(BaseNote note, boolean update);

  /**
   * Write the task to the database. Update task is already exists
   * 
   * @param task
   * @param update
   *          - if true, an SQL UPDATE query will be used. Else, INSERT
   * @return the ID of the task that was affected
   */
  public String writeTask(Task task, boolean update);

  /**
   * Delete a note from the database
   * 
   * @param noteId
   */
  public void deleteNote(String noteId);

  /**
   * Delete a task from the database
   * 
   * @param taskId
   */
  public void deleteTask(String taskId);

  /**
   * 
   * @param id
   *          - Patient's ID
   * @return the patient associated with the ID
   */
  public Patient getPatient(String id);

  /**
   * 
   * @return a list of all possible priority levels, structured as Pair
   *         (code, display text)
   */
  public List<Pair<Integer, String>> getPriorityLevels();

  /**
   * 
   * @return a list of all possible task statuses, structured as Pair
   *         (code, display text)
   */
  public List<Pair<Integer, String>> getTaskStatuses();

  /**
   * 
   * @return a list of all the users of the application in the database
   */
  public List<User> getAllUsers();

  /**
   * 
   * @param username
   * @return the user for the specified username
   */
  public User getUser(String username);

}
