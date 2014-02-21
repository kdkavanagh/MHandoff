import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
 
public class CreateTablesInitial {
 
	public static void main(String[] argv) {
 
		System.out.println("---------------------- Creating Initial Tables ----------------------");

		try {

			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e) {
 
			System.out.println("Where is your PostgreSQL JDBC Driver? Include in your library path!");
			e.printStackTrace();
			return;
		}
 
		Connection connection = null;
		try {
 
			connection = DriverManager.getConnection(
					"jdbc:postgresql://127.0.0.1:5432/handoff", "colleensain", "");
 
		} catch (SQLException e) {
 
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
			return;
		}
 
		if (connection == null) {
			System.out.println("Failed to make connection!");
			return;
		} 

		try {
			Statement statement = connection.createStatement();

	    String sql_create_patient = "CREATE TABLE Patient " +
							                 "(epicId VARCHAR(255) not NULL, " +
							                 " PRIMARY KEY ( epicId ))"; 
	      
	    String sql_create_user = "CREATE TABLE UserInfo " +
							                 "(uniqname VARCHAR(123) not NULL, " +
							                 " first VARCHAR(255), " + 
							                 " last VARCHAR(255), " + 
							                 " position VARCHAR(255), " +
							                 " PRIMARY KEY ( uniqname ))"; 

	    String sql_create_task = "CREATE TABLE Task " +
							                 "(taskId INTEGER not NULL, " +
							                 " text VARCHAR(255), " + 
							                 " reporter VARCHAR(255), " +
							                 " assignee VARCHAR(255), " +
							                 " reportedDate TIMESTAMP, " + 
							                 " expiration TIMESTAMP, " + 
							                 " priority INTEGER, " +
							                 " epicId VARCHAR(255), " +
							                 " FOREIGN KEY(assignee) REFERENCES UserInfo, " +
							                 " FOREIGN KEY(reporter) REFERENCES UserInfo, " +
							                 " FOREIGN KEY(epicId) REFERENCES Patient, " +
							                 " PRIMARY KEY ( taskId ))"; 

	    String sql_create_note = "CREATE TABLE BaseNote " +
							                 "(noteId INTEGER not NULL, " +
							                 " text VARCHAR(255), " + 
							                 " reporter VARCHAR(255), " + 
							                 " reportedDate TIMESTAMP, " + 
							                 " expiration TIMESTAMP, " + 
							                 " priority INTEGER, " +
							                 " epicId VARCHAR(255), " +
							                 " FOREIGN KEY(epicId) REFERENCES Patient, " +
							                 " FOREIGN KEY(reporter) REFERENCES UserInfo, " +
							                 " PRIMARY KEY ( noteId ))"; 


			String sql_index_patient_epic_id = "CREATE INDEX PatientEpicIdIndex " +
			                                   "ON Patient (epicId)";
			String sql_index_task_epic_id = "CREATE INDEX TaskEpicIdIndex " +
			                                   "ON Task (epicId)";
	 		String sql_index_note_epic_id = "CREATE INDEX NoteEpicIdIndex " +
			                                   "ON BaseNote (epicId)";    

	    statement.executeUpdate(sql_create_user);
	    System.out.println("Created user");

	    statement.executeUpdate(sql_create_patient);
	    System.out.println("Created patient");

	    statement.executeUpdate(sql_create_task);
	    System.out.println("Created task");


	    statement.executeUpdate(sql_create_note);
	    System.out.println("Created note");

	    statement.executeUpdate(sql_index_patient_epic_id);
	    System.out.println("Created patient epic idex");

	    statement.executeUpdate(sql_index_task_epic_id);
	    System.out.println("Created task epic idex");

	    statement.executeUpdate(sql_index_note_epic_id);
	    System.out.println("Created note epic idex");


		} catch (SQLException e) {
        e.printStackTrace();
    }
 
	}
 
}