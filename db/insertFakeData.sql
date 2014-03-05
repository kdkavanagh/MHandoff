INSERT INTO Patient (patientId)
VALUES ('1'),('2');

INSERT INTO HandoffUser (uniqname, first, last, position)
VALUES ('collsain', 'Colleen', 'Sain', 'student'),
('kminchan', 'Minchan', 'Kim', 'student'),
('johntyu', 'John', 'Yu', 'student'),
('mcspeak', 'Matt', 'Speakman', 'student'),
('kdkav', 'Kyle', 'Kavanagh', 'student');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, patientId)
VALUES ('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date, current_date + 10, 200, '1'),
('Large emesis. Decreased bolus feeds and increased frequency.', 'collsain', current_date, current_date + 10, 200, '1'),
('If sick, suspend enalopril', 'johntyu', current_date, current_date + 10, 50, '1'),('Increased fluid goals', 'mcspeak', current_date, current_date + 10, 50, '1'),
('Nam nec orci malesuada, venenatis dui sed, viverra mauris. Mauris pharetra lectus sit amet mi sodales, in eleifend libero porttitor. Curabitur hendrerit eros magna, sit amet viverra urna vulputate et.', 'collsain', current_date, current_date + 10, 0, '1'),
('Aenean vehicula interdum tortor, id ultricies nulla vestibulum in.', 'collsain', current_date, current_date + 10, 100, '1'),
('Lorem ipsum 4', 'collsain', current_date, current_date + 10, 200, '1');


INSERT INTO Task (text, reporter, assignee, reportedDate,status, expiration, priority, patientId)
VALUES ('11pm check platelets, if <50 give platelets', 'collsain', 'kminchan', current_date, 0, current_date + 5, 200, '1'),
('3am check platelets, if <50 give platelets', 'collsain', 'johntyu', current_date, 0, current_date + 5, 200, '1'),
('D/C order is in', 'kminchan', 'collsain', current_date, 0, current_date + 5, 150, '1'),
('MN I/Os If net negative, please add the difference to his IVF', 'mcspeak', 'johntyu', current_date,0,  current_date + 5, 150, '1'),
('D/C after PRBC, zinecard and adria after 1700 tonight', 'kdkav', 'johntyu', current_date, 0, current_date + 5, 0, '1');
