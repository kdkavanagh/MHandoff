package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.List;

import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Task;

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

  public List<Task> getTasksForPatient(String id);

  public Patient getPatient(String id);

  public List<Pair<Integer, String>> getPriorityLevels();

  public List<Pair<Integer, String>> getTaskStatuses();

  /**
   * 
   * @param patientId
   * @param note
   * @return true if write was successful
   */
  public boolean writeItem(String patientId, BaseNote note);

  /**
   * 
   * @param noteId
   * @return true if delete was successful
   */
  public boolean deleteItem(String noteId);

}
