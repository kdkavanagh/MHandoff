INSERT INTO Patient (epicId)
VALUES ('1');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('collsain', 'Colleen', 'Sain', 'student');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum', 'collsain', current_date, current_date + 10, 1, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum 2', 'collsain', current_date, current_date + 10, 1, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum 3', 'collsain', current_date, current_date + 10, 1, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum 4', 'collsain', current_date, current_date + 10, 1, '1');


SELECT noteId, text, reporter, reportedDate, expiration, priority, epicId
FROM BaseNote
WHERE epicId = '1';