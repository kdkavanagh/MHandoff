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

  @Inject
  public PersistenceServiceImpl() {
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
    List<BaseNote> tbr = new ArrayList<BaseNote>();
    try {

      Statement noteStatment = connection.createStatement();

      ResultSet noteResults = noteStatment.executeQuery("SELECT BaseNote.noteId, BaseNote.text, UserInfo.first, UserInfo.last, " +
          "extract(epoch from BaseNote.reportedDate), extract(epoch from BaseNote.expiration), BaseNote.priority, BaseNote.epicId " +
          "FROM BaseNote " +
          "INNER JOIN UserInfo " +
          "ON BaseNote.reporter=UserInfo.uniqname " +
          "WHERE epicId = '" + "1" + "' " +
          "ORDER BY priority ASC");

      while (noteResults.next()) {
        int index = 1;
        String noteId = noteResults.getString(index++);
        String text = noteResults.getString(index++);
        String reporter = noteResults.getString(index++) + " " + noteResults.getString(index++);
        String reportedDate = noteResults.getString(index++);
        String expiration = noteResults.getString(index++);
        Integer priority = noteResults.getInt(index++);
        tbr.add(new BaseNote(noteId, text, reporter, reportedDate, expiration, PriorityLevel.fromInt(priority)));
      }

      noteResults.close();
      noteStatment.close();

    } catch (SQLException e) {

      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

    return tbr;
  }

  public List<Task> getTasksForPatient(String id) {
    // List<Task> tbr = new ArrayList<Task>();

    // return tbr;
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
