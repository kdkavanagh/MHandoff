INSERT INTO Patient (epicId)
VALUES ('1');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('collsain', 'Colleen', 'Sain', 'student');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('kminchan', 'Minchan', 'Kim', 'student');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('johntyu', 'John', 'Yu', 'student');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('mcspeak', 'Matt', 'Speakman', 'student');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('kdkav', 'Kyle', 'Kavanagh', 'student');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date, current_date + 10, 1, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Large emesis. Decreased bolus feeds and increased frequency.', 'collsain', current_date, current_date + 10, 2, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('If sick, suspend enalopril', 'johntyu', current_date, current_date + 10, 2, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Increased fluid goals', 'mcspeak', current_date, current_date + 10, 3, '1');

INSERT INTO Task (text, reporter, assignee, reportedDate, expiration, priority, epicId)
VALUES ('11pm check platelets, if <50 give platelets', 'collsain', 'kminchan', current_date, current_date + 5, 1, '1');

INSERT INTO Task (text, reporter, assignee, reportedDate, expiration, priority, epicId)
VALUES ('3am check platelets, if <50 give platelets', 'collsain', 'johntyu', current_date, current_date + 5, 1, '1');

INSERT INTO Task (text, reporter, assignee, reportedDate, expiration, priority, epicId)
VALUES ('D/C order is in', 'kminchan', 'collsain', current_date, current_date + 5, 1, '1');

INSERT INTO Task (text, reporter, assignee, reportedDate, expiration, priority, epicId)
VALUES ('MN I/Os If net negative, please add the difference to his IVF', 'mcspeak', 'johntyu', current_date, current_date + 5, 1, '1');

INSERT INTO Task (text, reporter, assignee, reportedDate, expiration, priority, epicId)
VALUES ('D/C after PRBC, zinecard and adria after 1700 tonight', 'kdkav', 'johntyu', current_date, current_date + 5, 1, '1');

