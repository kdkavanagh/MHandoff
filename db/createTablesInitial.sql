DROP DATABASE "handoff";
DROP USER handoffUser;

CREATE USER handoffUser WITH password 'mottinnovate';
CREATE DATABASE "handoff" WITH OWNER handoffUser;
GRANT ALL PRIVILEGES ON DATABASE "handoff" to handoffUser;

\c handoff;
\echo Creating Patient table
CREATE TABLE Patient 
(patientId VARCHAR(255) not NULL, 
 active BOOLEAN DEFAULT TRUE,
 picBase64 VARCHAR(255),
PRIMARY KEY ( patientId )); 

GRANT ALL PRIVILEGES ON TABLE Patient TO handoffUser;


\echo Creating Users and Roles tables

CREATE TABLE users
(
  id SERIAL,
  username varchar(100) NOT NULL UNIQUE,
  first VARCHAR(255),  
  last VARCHAR(255), 
  pwd varchar(50) NOT NULL,
  PRIMARY KEY ( id )
);

CREATE TABLE roles
(
  id SERIAL,
  role varchar(100) NOT NULL,
PRIMARY KEY ( id )
);

CREATE TABLE user_roles
(
  user_id SERIAL NOT NULL,
  role_id SERIAL NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(role_id) REFERENCES roles(id)
);

GRANT ALL PRIVILEGES ON TABLE user_roles TO handoffUser;
GRANT ALL PRIVILEGES ON TABLE users TO handoffUser;
GRANT ALL PRIVILEGES ON TABLE roles TO handoffUser;

\echo Creating TaskStatus table
CREATE TABLE TaskStatus(
displayText VARCHAR(255),
code INTEGER,
PRIMARY KEY ( code )
);
GRANT ALL PRIVILEGES ON TABLE TaskStatus TO handoffUser;

\echo Creating PriorityLevel table
CREATE TABLE PriorityLevel(
displayText VARCHAR(255),
code INTEGER,
PRIMARY KEY ( code )
);
GRANT ALL PRIVILEGES ON TABLE PriorityLevel TO handoffUser;


\echo Creating Task table
CREATE TABLE Task 
(noteId SERIAL, 
text VARCHAR(255),  
reporter VARCHAR(255), 
assignee VARCHAR(255),
status INTEGER, 
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
patientId VARCHAR(255), 
FOREIGN KEY(assignee) REFERENCES users(username), 
FOREIGN KEY(reporter) REFERENCES users(username), 
FOREIGN KEY(status) REFERENCES TaskStatus(code), 
FOREIGN KEY(priority) REFERENCES PriorityLevel(code), 
FOREIGN KEY(patientId) REFERENCES Patient(patientId), 
PRIMARY KEY ( noteId )); 



GRANT ALL PRIVILEGES ON TABLE Task TO handoffUser;

\echo Creating BaseNote table
CREATE TABLE BaseNote 
(noteId SERIAL, 
text VARCHAR(255),  
reporter VARCHAR(255),  
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
patientId VARCHAR(255), 
FOREIGN KEY(patientId) REFERENCES Patient(patientId), 
FOREIGN KEY(reporter) REFERENCES users(username), 
FOREIGN KEY(priority) REFERENCES PriorityLevel(code), 
PRIMARY KEY ( noteId )); 

GRANT ALL PRIVILEGES ON TABLE BaseNote TO handoffUser;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO handoffUser;

\echo Creating indices 
CREATE INDEX TaskpatientIdIndex 
ON Task (patientId);
CREATE INDEX NotepatientIdIndex 
ON BaseNote (patientId);   

CREATE INDEX TaskAssigneeIndex 
ON Task (assignee);
CREATE INDEX TaskReporterIndex 
ON Task (reporter);

