package org.umich.mott.peds.innovation.handoff.persistence;

import java.util.List;

import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.inject.Inject;
import com.google.inject.Singleton;

/**
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 */
@Singleton
public class PersistenceServiceImpl implements PersistenceService {

  @Inject
  public PersistenceServiceImpl() {
    // Init the db connection here
  }

  public List<BaseNote> getNotesForPatient(String id) {
    // TODO Auto-generated method stub
    return null;
  }

  public List<Task> getTasksForPatient(String id) {
    // TODO Auto-generated method stub
    return null;
  }

  public Patient getPatient(String id) {
    // TODO Auto-generated method stub
    return null;
  }
}
