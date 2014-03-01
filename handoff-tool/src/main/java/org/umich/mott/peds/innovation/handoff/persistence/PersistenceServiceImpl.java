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

  private static final String NOTE_SELECT = "SELECT BaseNote.noteId, BaseNote.text, BaseNote.reporter, extract(epoch from BaseNote.reportedDate) as reportedDate, extract(epoch from BaseNote.expiration) as expiration, BaseNote.priority, BaseNote.patientId FROM BaseNote ";

  private static final String TASK_SELECT = "SELECT Task.taskId, Task.text, Task.reporter, Task.assignee, extract(epoch from Task.reportedDate) as reportedDate, extract(epoch from Task.expiration) as expiration, Task.priority, Task.status, Task.patientId FROM Task ";

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

  /**
   * Expects order "noteId, text, reporter, reportedData, expiration,
   * prioritycode"
   */
  private BaseNote noteFromResults(ResultSet noteResults) throws SQLException {
    String noteId = noteResults.getString("noteId");
    String patientId = noteResults.getString("patientId");
    String text = noteResults.getString("text");
    String reporter = noteResults.getString("reporter");
    String reportedDate = noteResults.getString("reportedDate");
    String expiration = noteResults.getString("expiration");
    int priorityCode = noteResults.getInt("priority");

    return new BaseNote(noteId, patientId, text, reporter, reportedDate, expiration, priorityCode);
  }

  /**
   * Expects order
   * "noteId, text, reporter, assignee, reportedDate, expiration, priorityCode, status"
   */
  private Task taskFromResults(ResultSet taskResults) throws SQLException {
    String noteId = taskResults.getString("taskId");
    String patientId = taskResults.getString("patientId");
    String text = taskResults.getString("text");
    String reporter = taskResults.getString("reporter");
    String assignee = taskResults.getString("assignee");
    String reportedDate = taskResults.getString("reportedDate");
    String expiration = taskResults.getString("expiration");
    int priorityCode = taskResults.getInt("priority");
    int status = taskResults.getInt("status");
    return new Task(noteId, patientId, text, reporter, assignee, status, reportedDate, expiration, priorityCode);

  }

  public List<BaseNote> getNotesForPatient(String id) {
    List<BaseNote> tbr = new ArrayList<BaseNote>();
    try {

      Statement noteStatment = connection.createStatement();
      ResultSet noteResults = noteStatment
          .executeQuery(NOTE_SELECT +
              "WHERE patientId = '" + id + "' " +
              "ORDER BY priority DESC");

      while (noteResults.next()) {
        tbr.add(noteFromResults(noteResults));
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
          .executeQuery(TASK_SELECT +
              "WHERE patientId = '" + id + "' " +
              "ORDER BY priority DESC");

      while (noteResults.next()) {
        tbr.add(taskFromResults(noteResults));
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

  public BaseNote getNoteById(String noteId) {
    BaseNote tbr = null;
    try {
      Statement noteStatment = connection.createStatement();
      ResultSet noteResults = noteStatment.executeQuery(NOTE_SELECT +
          "WHERE noteId = '" + noteId + "' ");

      while (noteResults.next()) {
        tbr = noteFromResults(noteResults);
      }
      noteResults.close();
      noteStatment.close();

    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

    return tbr;
  }

  public Task getTaskById(String taskId) {
    Task tbr = null;
    try {

      Statement noteStatment = connection.createStatement();

      ResultSet noteResults = noteStatment
          .executeQuery(TASK_SELECT +
              "WHERE taskId = '" + taskId + "'");

      while (noteResults.next()) {
        tbr = taskFromResults(noteResults);
      }

      noteResults.close();
      noteStatment.close();

    } catch (SQLException e) {

      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

    return tbr;
  }

  public void writeNote(BaseNote note) {
    StringBuilder sb = new StringBuilder();
    sb.append("INSERT INTO basenote (noteid, patientid, text, reporter, reportedDate, expiration, priority, assignee, status) ");
    sb.append("VALUES(");
    sb.append(note.getNoteId()).append(", ");
    sb.append(note.getPatientId()).append(", ");
    sb.append(note.getText()).append(", ");
    sb.append(note.getReporter()).append(", ");
    sb.append("timestamp(").append(note.getReportedDate()).append("), ");
    sb.append("timestamp(").append(note.getExpiration()).append("), ");
    sb.append(note.getPriorityCode()).append(", ");
    sb.append(") ");
    // Note: noteid and patientid are not updated.
    sb.append("ON DUPLICATE KEY UPDATE text=VALUES(text), reporter=VALUES(reporter), reportedDate=VALUES(reportedDate), expiration=VALUES(expiration), priority=VALUES(priority);");

    String query = sb.toString();

    try {
      Statement statment = connection.createStatement();
      int updateNum = statment.executeUpdate(query);
      logger.info("Updated " + updateNum + " row(s)");
      statment.close();
    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }

  }

  public void writeTask(Task task) {
    StringBuilder sb = new StringBuilder();
    sb.append("INSERT INTO task (taskid,patientId, text, reporter, reportedDate, expiration, priority) ");
    sb.append("VALUES(");
    sb.append(task.getNoteId()).append(", ");
    sb.append(task.getPatientId()).append(", ");
    sb.append(task.getText()).append(", ");
    sb.append(task.getReporter()).append(", ");
    sb.append("timestamp(").append(task.getReportedDate()).append("), ");
    sb.append("timestamp(").append(task.getExpiration()).append("), ");
    sb.append(task.getPriorityCode()).append(", ");
    sb.append(") ");
    // Note: noteid and patientid are not updated.
    sb.append("ON DUPLICATE KEY UPDATE text=VALUES(text), reporter=VALUES(reporter), reportedDate=VALUES(reportedDate), expiration=VALUES(expiration), priority=VALUES(priority), status=VALUES(status), assignee=VALUES(assignee);");

    String query = sb.toString();

    try {
      Statement statment = connection.createStatement();
      int updateNum = statment.executeUpdate(query);
      logger.info("Updated " + updateNum + " row(s)");
      statment.close();
    } catch (SQLException e) {
      logger.fatal("Cannot create statement or execute results.");
      throw new RuntimeException(e);
    }
  }

  public void deleteNote(String noteId) {
    // TODO Auto-generated method stub

  }

  public void deleteTask(String taskId) {
    // TODO Auto-generated method stub

  }

}
