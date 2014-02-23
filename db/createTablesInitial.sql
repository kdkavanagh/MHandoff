CREATE TABLE Patient 
(epicId VARCHAR(255) not NULL, 
PRIMARY KEY ( epicId )); 

CREATE TABLE UserInfo 
(uniqname VARCHAR(123) not NULL, 
first VARCHAR(255),  
last VARCHAR(255),  
position VARCHAR(255), 
PRIMARY KEY ( uniqname )); 

CREATE TABLE Task 
(taskId INTEGER not NULL, 
text VARCHAR(255),  
reporter VARCHAR(255), 
assignee VARCHAR(255), 
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
epicId VARCHAR(255), 
FOREIGN KEY(assignee) REFERENCES UserInfo, 
FOREIGN KEY(reporter) REFERENCES UserInfo, 
FOREIGN KEY(epicId) REFERENCES Patient, 
PRIMARY KEY ( taskId )); 

CREATE TABLE BaseNote 
(noteId INTEGER not NULL, 
text VARCHAR(255),  
reporter VARCHAR(255),  
reportedDate TIMESTAMP,  
expiration TIMESTAMP,  
priority INTEGER, 
epicId VARCHAR(255), 
FOREIGN KEY(epicId) REFERENCES Patient, 
FOREIGN KEY(reporter) REFERENCES UserInfo, 
PRIMARY KEY ( noteId )); 

CREATE INDEX PatientEpicIdIndex 
ON Patient (epicId);
CREATE INDEX TaskEpicIdIndex 
ON Task (epicId);
CREATE INDEX NoteEpicIdIndex 
ON BaseNote (epicId);    
