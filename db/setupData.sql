INSERT INTO TaskStatus (displayText, code)
VALUES ('Not Started', 0),('In Progress', 50), ('Completed',100);

INSERT INTO PriorityLevel (displayText, code)
VALUES ('Personal Note', 0),('Low Priority', 50), ('Medium Priority',100), ('High Priority', 150), ('Critical', 200);

INSERT INTO roles (role)
VALUES ('user'),('admin');

INSERT INTO users (username, first, last, pwd)
VALUES ('collsain', 'Colleen', 'Sain', 'password'),
('kminchan', 'Minchan', 'Kim', 'password'),
('johntyu', 'John', 'Yu', 'password'),
('mcspeak', 'Matt', 'Speakman', 'password'),
('kdkav', 'Kyle', 'Kavanagh', 'password');

INSERT INTO user_roles (user_id, role_id)
SELECT users.id, 2 FROM users;

INSERT INTO user_roles (user_id, role_id)
SELECT users.id, 1 FROM users;
