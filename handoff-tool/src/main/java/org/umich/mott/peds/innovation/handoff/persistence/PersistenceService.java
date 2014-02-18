package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.List;

import org.umich.mott.peds.innovation.handoff.common.BaseNote;
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
@ImplementedBy(DummyPersistenceService.class)
public interface PersistenceService {

  public List<BaseNote> getNotesForPatient(String id);

  public List<Task> getTasksForPatient(String id);

  public Patient getPatient(String id);
}
