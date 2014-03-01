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
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.Task;
import org.umich.mott.peds.innovation.handoff.common.User;

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
      ResultSet noteResults = noteStatment.executeQuery("SELECT BaseNote.noteId, BaseNote.text, BaseNote.reporter, " +
          "extract(epoch from BaseNote.reportedDate), extract(epoch from BaseNote.expiration), BaseNote.priority, BaseNote.epicId " +
          "FROM BaseNote " +
          "WHERE epicId = '" + "1" + "' " +
          "ORDER BY priority DESC");

      while (noteResults.next()) {
        int index = 1;
        String noteId = noteResults.getString(index++);
        String text = noteResults.getString(index++);
        String reporter = noteResults.getString(index++);
        String reportedDate = noteResults.getString(index++);
        String expiration = noteResults.getString(index++);

        int priorityCode = noteResults.getInt(index++);
        tbr.add(new BaseNote(noteId, text, reporter, reportedDate, expiration, priorityCode));
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
          .executeQuery("SELECT Task.taskId, Task.text, Task.reporter, Task.assignee, extract(epoch from Task.reportedDate), extract(epoch from Task.expiration), Task.priority, Task.status, Task.epicId "
              + "FROM Task " +
              "WHERE epicId = '" + "1" + "' " +
              "ORDER BY priority DESC");

      while (noteResults.next()) {
        int index = 1;
        String noteId = noteResults.getString(index++);
        String text = noteResults.getString(index++);
        String reporter = noteResults.getString(index++);
        String assignee = noteResults.getString(index++);
        String reportedDate = noteResults.getString(index++);
        String expiration = noteResults.getString(index++);
        int priorityCode = noteResults.getInt(index++);
        int status = noteResults.getInt(index++);
        tbr.add(new Task(noteId, text, reporter, assignee, status, reportedDate, expiration, priorityCode));
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

  public List<Pair<Integer, String>> getPriorityLevels() {
    List<Pair<Integer, String>> tbr = new ArrayList<Pair<Integer, String>>();
    try {
      Statement statment = connection.createStatement();
      ResultSet results = statment
          .executeQuery("SELECT PriorityLevel.code, PriorityLevel.displayText " +
              "FROM PriorityLevel " +
              "ORDER BY code DESC");

      while (results.next()) {
        int index = 1;
        int value = Integer.parseInt(results.getString(index++));
        String text = results.getString(index++);

        tbr.add(new Pair<Integer, String>(value, text));
      }
      results.close();
      statment.close();

    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }
    return tbr;
  }

  public List<Pair<Integer, String>> getTaskStatuses() {
    List<Pair<Integer, String>> tbr = new ArrayList<Pair<Integer, String>>();
    try {
      Statement statment = connection.createStatement();
      ResultSet results = statment
          .executeQuery("SELECT TaskStatus.code, TaskStatus.displayText FROM TaskStatus ORDER BY code DESC");

      while (results.next()) {
        int index = 1;
        int value = Integer.parseInt(results.getString(index++));
        String text = results.getString(index++);

        tbr.add(new Pair<Integer, String>(value, text));
      }
      results.close();
      statment.close();

    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }
    return tbr;
  }

  public List<User> getAllUsers() {
    List<User> tbr = new ArrayList<User>();
    try {
      Statement statment = connection.createStatement();
      ResultSet results = statment
          .executeQuery("SELECT HandoffUser.uniqname, HandoffUser.first, HandoffUser.last FROM HandoffUser ");

      while (results.next()) {
        int index = 1;
        String uniq = results.getString(index++);
        String first = results.getString(index++);
        String last = results.getString(index++);

        tbr.add(new User(uniq, first, last));
      }
      results.close();
      statment.close();

    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }
    return tbr;
  }

}
