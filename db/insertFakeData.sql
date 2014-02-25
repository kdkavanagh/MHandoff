INSERT INTO Patient (epicId)
VALUES ('1');

INSERT INTO UserInfo (uniqname, first, last, position)
VALUES ('collsain', 'Colleen', 'Sain', 'student');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum in velit ut vulputate. Morbi imperdiet porttitor justo at vulputate. ', 'collsain', current_date, current_date + 10, 1, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Nam nec orci malesuada, venenatis dui sed, viverra mauris. Mauris pharetra lectus sit amet mi sodales, in eleifend libero porttitor. Curabitur hendrerit eros magna, sit amet viverra urna vulputate et.', 'collsain', current_date, current_date + 10, 2, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Aenean vehicula interdum tortor, id ultricies nulla vestibulum in.', 'collsain', current_date, current_date + 10, 3, '1');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, epicId)
VALUES ('Lorem ipsum 4', 'collsain', current_date, current_date + 10, 1, '1');
