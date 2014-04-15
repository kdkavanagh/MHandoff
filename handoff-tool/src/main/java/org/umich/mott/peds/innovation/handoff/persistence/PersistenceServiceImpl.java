package org.umich.mott.peds.innovation.handoff.persistence;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.umich.mott.EMRConnector.EMRDriver;
import org.umich.mott.EMRConnector.EMRDriverManager;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Pair;
import org.umich.mott.peds.innovation.handoff.common.Patient;
import org.umich.mott.peds.innovation.handoff.common.PatientTile;
import org.umich.mott.peds.innovation.handoff.common.Task;
import org.umich.mott.peds.innovation.handoff.common.User;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class PersistenceServiceImpl implements PersistenceService {

  private static final Logger logger = Logger.getLogger(PersistenceServiceImpl.class);

  private static final EMRDriver emr;

  private static final String JDBC, dbUser, dbPass;

  private static final String NOTE_SELECT = "SELECT BaseNote.noteId, BaseNote.text, BaseNote.reporter, extract(epoch from BaseNote.reportedDate) as reportedDate, extract(epoch from BaseNote.expiration) as expiration, BaseNote.priority, BaseNote.patientId FROM BaseNote ";

  private static final String TASK_SELECT = "SELECT Task.noteId, Task.text, Task.reporter, Task.assignee, extract(epoch from Task.reportedDate) as reportedDate, extract(epoch from Task.expiration) as expiration, Task.priority, Task.status, Task.patientId FROM Task ";

  private static final Properties properties = new Properties();

  static {

    try {
      properties.load(PersistenceServiceImpl.class.getResourceAsStream("/MHandoff.properties"));
    } catch (IOException e) {
      throw new RuntimeException("Failed to find MHandoff.properties file");
    }

    dbUser = properties.getProperty("database.user");
    dbPass = properties.getProperty("database.password");
    JDBC = properties.getProperty("database.jdbc.url");

    // register our EMR Connector
    try {
      Class.forName(properties.getProperty("emr.driver.class"));
      emr = EMRDriverManager.getDriver();
    } catch (ClassNotFoundException e1) {
      logger.fatal("No EMR Connector Driver found.");
      throw new RuntimeException(e1);
    }

    // Register our JDBC driver
    try {
      Class.forName(properties.getProperty("database.jdbc.driver", "org.postgresql.Driver"));
    } catch (ClassNotFoundException e) {
      logger.fatal("No PostgreSQL Driver found.");
      throw new RuntimeException(e);
    }

  }

  @Inject
  public PersistenceServiceImpl() {
  }

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

  private Task taskFromResults(ResultSet taskResults) throws SQLException {
    String noteId = taskResults.getString("noteId");
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

  public List<BaseNote> getNotesForPatient(String id, boolean getExpired) {
    List<BaseNote> tbr = new ArrayList<BaseNote>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      StringBuilder query = new StringBuilder();
      query.append(NOTE_SELECT + "WHERE patientId = '" + id + "'");
      if (!getExpired) {
        query.append("AND expiration > now() ");
      }
      query.append("ORDER BY priority DESC");
      resultSet = statement
          .executeQuery(query.toString());

      while (resultSet.next()) {
        tbr.add(noteFromResults(resultSet));
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }

    return tbr;
  }

  public List<Task> getTasksForPatient(String id, boolean getExpired) {
    List<Task> tbr = new ArrayList<Task>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      StringBuilder query = new StringBuilder();
      query.append(TASK_SELECT + "WHERE patientId = '" + id + "'");
      if (!getExpired) {
        query.append("AND expiration > now() ");
      }
      query.append("ORDER BY priority DESC");
      resultSet = statement
          .executeQuery(query.toString());

      while (resultSet.next()) {
        tbr.add(taskFromResults(resultSet));
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }

    return tbr;
  }

  public PatientTile getPatientTile(String id) {
    PatientTile tbr = null;
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      StringBuilder query = new StringBuilder();
      query.append("SELECT Patient.patientId, COUNT(DISTINCT BaseNote.noteId) AS noteCount, COUNT(DISTINCT Task.noteId) AS taskCount FROM Patient");
      query.append(" LEFT JOIN BaseNote ON Patient.patientId=BaseNote.patientId ");
      query.append(" LEFT JOIN Task ON Patient.patientId=Task.patientId ");
      query.append("WHERE Patient.patientId='" + id + "' ");
      query.append("GROUP BY Patient.patientId");
      logger.trace(query.toString());
      resultSet = statement.executeQuery(query.toString());

      while (resultSet.next()) {
        tbr = patientTileFromResultSet(resultSet);
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public List<PatientTile> getAllPatientTiles(String handoffUser, boolean activePatientsOnly) {
    List<PatientTile> tbr = new LinkedList<PatientTile>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      StringBuilder query = new StringBuilder();
      query
          .append("SELECT Patient.patientId, COUNT(DISTINCT BaseNote.noteId) AS noteCount, COUNT(DISTINCT Task.noteId) AS taskCount, BasicInfo.name, BasicInfo.location, BasicInfo.dateofbirth FROM Patient");
      query.append(" LEFT JOIN BaseNote ON Patient.patientId=BaseNote.patientId ");
      query.append(" LEFT JOIN Task ON Patient.patientId=Task.patientId ");
      query.append(" LEFT JOIN BasicInfo ON Patient.patientId=BasicInfo.patientId ");
      query.append("WHERE Patient.active='" + Boolean.toString(activePatientsOnly) + "' ");
      query.append("GROUP BY Patient.patientId, BasicInfo.location, BasicInfo.dateofbirth, BasicInfo.name");
      logger.trace(query.toString());
      resultSet = statement.executeQuery(query.toString());

      while (resultSet.next()) {
        tbr.add(patientTileFromResultSet(resultSet));
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  private PatientTile patientTileFromResultSet(ResultSet resultSet) throws SQLException {
    int noteCount = resultSet.getInt("noteCount");
    int taskCount = resultSet.getInt("taskCount");
    String id = resultSet.getString("patientId");

    String name = resultSet.getString("name");
    String loc = resultSet.getString("location");
    Timestamp time = resultSet.getTimestamp("dateofbirth");
    String dob = time.toString().substring(0, 10);

    return new PatientTile(new Patient.BasicInfo(id, name, dob, loc), "nopic", noteCount, taskCount);

  }

  public List<Pair<Integer, String>> getPriorityLevels() {
    List<Pair<Integer, String>> tbr = new ArrayList<Pair<Integer, String>>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery("SELECT PriorityLevel.code, PriorityLevel.displayText FROM PriorityLevel ORDER BY code DESC");

      while (resultSet.next()) {
        int index = 1;
        int value = Integer.parseInt(resultSet.getString(index++));
        String text = resultSet.getString(index++);

        tbr.add(new Pair<Integer, String>(value, text));
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public List<Pair<Integer, String>> getTaskStatuses() {
    List<Pair<Integer, String>> tbr = new ArrayList<Pair<Integer, String>>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery("SELECT TaskStatus.code, TaskStatus.displayText FROM TaskStatus ORDER BY code DESC");

      while (resultSet.next()) {
        int index = 1;
        int value = Integer.parseInt(resultSet.getString(index++));
        String text = resultSet.getString(index++);

        tbr.add(new Pair<Integer, String>(value, text));
      }
    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public List<User> getAllUsers() {
    List<User> tbr = new ArrayList<User>();
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery("SELECT username, first, last FROM users ");

      while (resultSet.next()) {
        int index = 1;
        String uniq = resultSet.getString(index++);
        String first = resultSet.getString(index++);
        String last = resultSet.getString(index++);

        tbr.add(new User(uniq, first, last));
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public User getUser(String username) {
    User tbr = null;
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery("SELECT username, first, last FROM users WHERE username='" + username + "'");

      while (resultSet.next()) {
        int index = 1;
        String uniq = resultSet.getString(index++);
        String first = resultSet.getString(index++);
        String last = resultSet.getString(index++);

        tbr = new User(uniq, first, last);
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public BaseNote getNoteById(String noteId) {
    BaseNote tbr = null;
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery(NOTE_SELECT + "WHERE noteId = '" + noteId + "' ");

      while (resultSet.next()) {
        tbr = noteFromResults(resultSet);
      }

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }

    return tbr;
  }

  public Task getTaskById(String noteId) {
    Task tbr = null;
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery(TASK_SELECT + "WHERE noteId = '" + noteId + "'");
      while (resultSet.next()) {
        tbr = taskFromResults(resultSet);
      }
    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;
  }

  public String writeNote(BaseNote note, boolean update) {
    String tbr = null;
    StringBuilder sb = new StringBuilder();
    if (update) {
      // update
      sb.append("UPDATE basenote SET ( patientid, text, reporter, reportedDate, expiration, priority) = ");
      sb.append("(");
      sb.append(note.getPatientId()).append(", ");
      sb.append("'").append(note.getText()).append("', ");
      sb.append("'").append(note.getReporter()).append("', ");
      sb.append("to_timestamp(").append(note.getReportedDate()).append("), ");
      sb.append("to_timestamp(").append(note.getExpiration()).append("), ");
      sb.append(note.getPriorityCode());
      sb.append(") WHERE noteid=");
      sb.append(note.getNoteId());
      sb.append(" RETURNING noteid");

    } else {
      // insert
      sb.append("INSERT INTO basenote ( patientid, text, reporter, reportedDate, expiration, priority) ");
      sb.append("VALUES(");
      sb.append(note.getPatientId()).append(", ");
      sb.append("'").append(note.getText()).append("', ");
      sb.append("'").append(note.getReporter()).append("', ");
      sb.append("to_timestamp(").append(note.getReportedDate()).append("), ");
      sb.append("to_timestamp(").append(note.getExpiration()).append("), ");
      sb.append(note.getPriorityCode());
      sb.append(") RETURNING noteid");
      // code for other sql updates
      // sb.append("ON DUPLICATE KEY UPDATE text=VALUES(text), reporter=VALUES(reporter), reportedDate=VALUES(reportedDate), expiration=VALUES(expiration), priority=VALUES(priority);");

    }

    String query = sb.toString();
    logger.debug("Writing note: " + query);
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery(query);
      resultSet.next();
      tbr = resultSet.getString("noteid");
      logger.debug("Updated Note " + tbr);
    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
    return tbr;

  }

  public String writeTask(Task task, boolean update) {
    String tbr = null;
    StringBuilder sb = new StringBuilder();
    if (update) {
      sb.append("UPDATE task SET (patientId, text, reporter, reportedDate, expiration, priority, assignee, status) = ");
      sb.append("(");
      sb.append(task.getPatientId()).append(", ");
      sb.append("'").append(task.getText()).append("', ");
      sb.append("'").append(task.getReporter()).append("', ");
      sb.append("to_timestamp(").append(task.getReportedDate()).append("), ");
      sb.append("to_timestamp(").append(task.getExpiration()).append("), ");
      sb.append(task.getPriorityCode()).append(", ");
      sb.append("'").append(task.getAssignee()).append("', ");
      sb.append(task.getStatus());
      sb.append(") WHERE noteId=");
      sb.append(task.getNoteId());
      sb.append(" RETURNING noteId");
    } else {
      sb.append("INSERT INTO task (patientId, text, reporter, reportedDate, expiration, priority, assignee, status) ");
      sb.append("VALUES(");
      sb.append(task.getPatientId()).append(", ");
      sb.append("'").append(task.getText()).append("', ");
      sb.append("'").append(task.getReporter()).append("', ");
      sb.append("to_timestamp(").append(task.getReportedDate()).append("), ");
      sb.append("to_timestamp(").append(task.getExpiration()).append("), ");
      sb.append(task.getPriorityCode()).append(", ");
      sb.append("'").append(task.getAssignee()).append("', ");
      sb.append(task.getStatus());
      sb.append(") RETURNING noteId");

      // sb.append("ON DUPLICATE KEY UPDATE text=VALUES(text), reporter=VALUES(reporter), reportedDate=VALUES(reportedDate), expiration=VALUES(expiration), priority=VALUES(priority), status=VALUES(status), assignee=VALUES(assignee);");
    }

    String query = sb.toString();
    logger.debug("Writing task: " + query);
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery(query);
      resultSet.next();
      tbr = resultSet.getString("noteId");
      logger.debug("Updated Task " + tbr);
    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }

    return tbr;
  }

  private void deleteNoteOrTask(String id, String table) {
    String query = "DELETE FROM " + table + " WHERE noteid=" + id + " RETURNING noteid";
    String tbr = null;
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
      connection = DriverManager.getConnection(JDBC, dbUser, dbPass);
      statement = connection.createStatement();
      resultSet = statement.executeQuery(query);
      resultSet.next();
      tbr = resultSet.getString("noteid");

    } catch (SQLException e) {
      logger.error("Failed to execute query", e);
      throw new RuntimeException(e);
    } finally {
      closeDBConnection(connection, statement, resultSet);
    }
  }

  public void deleteNote(String noteId) {
    deleteNoteOrTask(noteId, "basenote");
  }

  public void deleteTask(String noteId) {
    deleteNoteOrTask(noteId, "task");
  }

  private static void closeDBConnection(Connection connection, Statement statement, ResultSet resultSet) {
    if (resultSet != null)
      try {
        resultSet.close();
      } catch (SQLException ignore) {
      }
    if (statement != null)
      try {
        statement.close();
      } catch (SQLException ignore) {
      }
    if (connection != null)
      try {
        connection.close();
      } catch (SQLException ignore) {
      }
  }

  public List<Patient> getAllPatients() {
    // TODO Auto-generated method stub
    return null;
  }

}
