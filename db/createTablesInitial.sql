DROP DATABASE "handoff";
DROP USER handoffUser;

CREATE USER handoffUser WITH password 'mottinnovate';
CREATE DATABASE "handoff" WITH OWNER handoffUser;
GRANT ALL PRIVILEGES ON DATABASE "handoff" to handoffUser;

\c handoff;
\echo Creating Patient table
CREATE TABLE Patient 
(epicId VARCHAR(255) not NULL, 
PRIMARY KEY ( epicId )); 

GRANT ALL PRIVILEGES ON TABLE Patient TO handoffUser;

\echo Creating HandoffUser table
CREATE TABLE HandoffUser 
(uniqname VARCHAR(123) not NULL, 
first VARCHAR(255),  
last VARCHAR(255),  
position VARCHAR(255), 
PRIMARY KEY ( uniqname )); 

GRANT ALL PRIVILEGES ON TABLE HandoffUser TO handoffUser;

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
(taskId SERIAL, 
text VARCHAR(255),  
reporter VARCHAR(255), 
assignee VARCHAR(255),
status INTEGER, 
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
epicId VARCHAR(255), 
FOREIGN KEY(assignee) REFERENCES HandoffUser, 
FOREIGN KEY(reporter) REFERENCES HandoffUser, 
FOREIGN KEY(status) REFERENCES TaskStatus, 
FOREIGN KEY(priority) REFERENCES PriorityLevel, 
FOREIGN KEY(epicId) REFERENCES Patient, 
PRIMARY KEY ( taskId )); 



GRANT ALL PRIVILEGES ON TABLE Task TO handoffUser;

\echo Creating BaseNote table
CREATE TABLE BaseNote 
(noteId SERIAL, 
text VARCHAR(255),  
reporter VARCHAR(255),  
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
epicId VARCHAR(255), 
FOREIGN KEY(epicId) REFERENCES Patient, 
FOREIGN KEY(reporter) REFERENCES HandoffUser, 
FOREIGN KEY(priority) REFERENCES PriorityLevel, 
PRIMARY KEY ( noteId )); 

GRANT ALL PRIVILEGES ON TABLE BaseNote TO handoffUser;

\echo Creating indices 
CREATE INDEX TaskEpicIdIndex 
ON Task (epicId);
CREATE INDEX NoteEpicIdIndex 
ON BaseNote (epicId);   

CREATE INDEX TaskAssigneeIndex 
ON Task (assignee);
CREATE INDEX TaskReporterIndex 
ON Task (reporter);

