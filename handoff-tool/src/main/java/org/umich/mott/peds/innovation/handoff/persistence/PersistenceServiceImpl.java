package org.umich.mott.peds.innovation.handoff.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class PersistenceServiceImpl implements PersistenceService {

  private static Connection connection;

  private static final Logger logger = Logger.getLogger(PersistenceServiceImpl.class);

  private static final String JDBC = "jdbc:postgresql://127.0.0.1:5432/handoff";

  private static final String dbUser = "colleensain";

  private static final String dbPass = "";

  @Inject
  public PersistenceServiceImpl() {
    try {
      Class.forName("org.postgresql.Driver");
    } catch (ClassNotFoundException e) {
      logger.fatal("Dont have Postgre Drivers");
      throw new RuntimeException(e);
    }

    try {
      this.connection = DriverManager.getConnection(
          JDBC, dbUser, dbPass);
    } catch (SQLException e) {
      logger.fatal("Cant connection to db");
      throw new RuntimeException(e);
    }

  }

  public List<BaseNote> getNotesForPatient(String id) {
    return null;
  }

  public List<Task> getTasksForPatient(String id) {

    return null;
  }

  public Patient getPatient(String id) {

    return null;
  }

  public boolean writeItem(String patientId, BaseNote note) {
    // TODO Auto-generated method stub
    return false;
  }

  public boolean deleteItem(String noteId) {
    // TODO Auto-generated method stub
    return false;
  }

}
