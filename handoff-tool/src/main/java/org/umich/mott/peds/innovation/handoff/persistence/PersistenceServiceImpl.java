package org.umich.mott.peds.innovation.handoff.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Patient;
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
          "extract(epoch from BaseNote.reportedDate), extract(epoch from BaseNote.expiration), PriorityLevel.displayText, BaseNote.epicId " +
          "FROM BaseNote " +
          "INNER JOIN UserInfo ON BaseNote.reporter=UserInfo.uniqname " +
          "INNER JOIN PriorityLevel ON BaseNote.priority=PriorityLevel.code " +
          "WHERE epicId = '" + "1" + "' " +
          "ORDER BY priority ASC");

      while (noteResults.next()) {
        int index = 1;
        String noteId = noteResults.getString(index++);
        String text = noteResults.getString(index++);
        String reporter = noteResults.getString(index++) + " " + noteResults.getString(index++);
        String reportedDate = noteResults.getString(index++);
        String expiration = noteResults.getString(index++);
        String priority = noteResults.getString(index++);
        tbr.add(new BaseNote(noteId, text, reporter, reportedDate, expiration, priority));
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
    List<Task> tbr = new ArrayList<Task>();
    try {

      Statement noteStatment = connection.createStatement();

      ResultSet noteResults = noteStatment
          .executeQuery("SELECT Task.taskId, Task.text, ReportUser.first, ReportUser.last, "
              +
              "AssignUser.first, AssignUser.last, extract(epoch from Task.reportedDate), extract(epoch from Task.expiration), PriorityLevel.displayText, TaskStatus.displayText, Task.epicId "
              +
              "FROM Task " +
              "INNER JOIN UserInfo ReportUser ON Task.reporter=ReportUser.uniqname " +
              "INNER JOIN UserInfo AssignUser ON Task.assignee=AssignUser.uniqname " +
              "INNER JOIN PriorityLevel ON Task.priority=PriorityLevel.code " +
              "INNER JOIN TaskStatus ON Task.status=TaskStatus.code " +
              "WHERE epicId = '" + "1" + "' " +
              "ORDER BY priority ASC");

      while (noteResults.next()) {
        int index = 1;
        String noteId = noteResults.getString(index++);
        String text = noteResults.getString(index++);
        String reporter = noteResults.getString(index++) + " " + noteResults.getString(index++);
        String assignee = noteResults.getString(index++) + " " + noteResults.getString(index++);
        String reportedDate = noteResults.getString(index++);
        String expiration = noteResults.getString(index++);
        String priority = noteResults.getString(index++);
        String status = noteResults.getString(index++);
        tbr.add(new Task(noteId, text, reporter, assignee, status, reportedDate, expiration, priority));
      }

      noteResults.close();
      noteStatment.close();

    } catch (SQLException e) {

      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

    return tbr;
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
