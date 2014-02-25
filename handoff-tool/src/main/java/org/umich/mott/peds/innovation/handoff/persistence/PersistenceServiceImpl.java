package org.umich.mott.peds.innovation.handoff.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
// import java.util.Random;
import java.util.List;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.PriorityLevel;
import org.umich.mott.peds.innovation.handoff.common.Task;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class PersistenceServiceImpl implements PersistenceService {

  private Connection connection;

  private static final Logger logger = Logger.getLogger(PersistenceServiceImpl.class);

  private static final String JDBC = "jdbc:postgresql://127.0.0.1:5432/handoff";

  private static final String dbUser = "handoffuser";

  private static final String dbPass = "mottinnovate";

  private final List<BaseNote> notes = new ArrayList<BaseNote>();

  private final List<Task> tasks = new ArrayList<Task>();

  @Inject
  public PersistenceServiceImpl() {

    notes.add(new BaseNote("123", "This note was added in the constructor", "Colleen Sain", "01/01/2014", "01/01/2014", PriorityLevel.ONE));
    notes.add(new BaseNote("234", "This note was also added in the constructor", "Colleen Sain", "01/01/2014", "01/01/2014", PriorityLevel.ONE));

    try {

      Class.forName("org.postgresql.Driver");
    } catch (ClassNotFoundException e) {

      logger.fatal("No PostgreSQL Driver found.");
      throw new RuntimeException(e);
    }

    try {

      this.connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
    } catch (SQLException e) {

      logger.fatal("Cannot make connection to PostgreSQL database.");
      throw new RuntimeException(e);
    }
  }

  public List<BaseNote> getNotesForPatient(String id) {

    notes.add(new BaseNote("111", "Test top", "Colleen Sain", "02/11/2014", "02/21/2014", PriorityLevel.ONE));

    try {

      Statement statement = connection.createStatement();

      ResultSet results = statement.executeQuery("SELECT noteId, text, reporter, " + 
                         "reportedDate, expiration, priority, epicId " +
                         "FROM BaseNote " +
                         "WHERE epicId = '" + "1" + "'");
                                           // id

      while(results.next()){

        String noteId = results.getString(1);
        String text = results.getString(2);
        String reporter = results.getString(3);
        String reportedDate = results.getString(4);
        String expiration = results.getString(5);
        Integer priority = results.getInt(6);

        notes.add(new BaseNote(noteId, text, reporter, reportedDate, expiration, PriorityLevel.ONE));

      }

      results.close();
      statement.close();

    } catch (SQLException e) {

      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

    notes.add(new BaseNote("222", "Test bottom", "Colleen Sain", "02/11/2014", "02/21/2014", PriorityLevel.TWO));

    return notes;
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
