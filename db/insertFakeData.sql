INSERT INTO Patient (patientId)
VALUES ('1'),('2'),('3'),('4'), ('5');

INSERT INTO BasicInfo (patientId, name, dateOfBirth, gender, location)
VALUES
	('1', 'Rachel S. Ramos', current_date - 1000, 'f', 'Bed D340'),
	('2', 'Ju Hsüeh', current_date - 2000, 'm', 'Bed B123'),
	('3', 'Virginia Harrison', current_date - 2300, 'f', 'Bed F112'),
	('4', 'Michael Sherman', current_date - 400, 'm', 'Bed C014'),
	('5', 'Esther Christie', current_date - 750, 'f', 'Bed A233');

INSERT INTO BaseNote (text, reporter, reportedDate, expiration, priority, patientId)
VALUES 
-- Patient 1
	('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date - 90000, current_date + 10, 100, '1'),
	('Large emesis. Decreased bolus feeds and increased frequency.', 'collsain', current_date, current_date + 10, 200, '1'),
	('If sick, suspend enalopril', 'johntyu', current_date - 91000, current_date + 10, 0, '1'),
	('CIS ANYTIME- consider adding vanc page fellow', 'mcspeak', current_date - 100000, current_date + 10, 50, '1'),
	('Relapsed AML, induction chemo', 'mcspeak', current_date - 90000, current_date + 10, 50, '1'),
	('In pain. Continuing home oxy with additional 1/2 does of oxy for breakthrough pain (q2h) APS consulted, working on alternate pain regimen'
, 'mcspeak', current_date - 90000, current_date + 10, 50, '1'),
-- Patient 2
	('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date - 90000, current_date + 10, 100, '2'),
	('Large emesis. Decreased bolus feeds and increased frequency.', 'collsain', current_date, current_date + 10, 200, '2'),
	('If sick, suspend enalopril', 'johntyu', current_date - 91000, current_date + 10, 0, '2'),
	('Increased fluid goals', 'mcspeak', current_date - 100000, current_date, 50, '2'),
	('Pineoblastoma- concern for disease progression', 'kdkav', current_date, current_date + 10, 50, '2'),
	('Osteosarcoma, chemotherapy', 'kdkav', current_date, current_date + 10, 50, '2'),
-- Patient 3
	('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date - 90000, current_date + 10, 100, '3'),
	('Relapsed AML, induction chemo', 'mcspeak', current_date - 90000, current_date + 10, 50, '3'),
	('In pain. Continuing home oxy with additional 1/2 does of oxy for breakthrough pain (q2h) APS consulted, working on alternate pain regimen'
, 'mcspeak', current_date - 90000, current_date + 10, 50, '3'),

-- Patient 4
	('No steroids unless absolutely necessary - compromises tx', 'johntyu', current_date - 90000, current_date + 10, 100, '4'),
	('Large emesis. Decreased bolus feeds and increased frequency.', 'johntyu', current_date, current_date + 10, 200, '4'),
	('If sick, suspend enalopril', 'johntyu', current_date - 91000, current_date + 10, 0, '4'),
	('Increased fluid goals', 'kminchan', current_date - 100000, current_date, 50, '4'),
	('Pineoblastoma- concern for disease progression', 'kminchan', current_date, current_date + 10, 50, '4'),
	('Osteosarcoma, chemotherapy', 'kdkav', current_date, current_date + 10, 50, '4'),
	('CIS ANYTIME- consider adding vanc page fellow', 'kminchan', current_date - 100000, current_date + 10, 50, '4'),
	('Relapsed AML, induction chemo', 'mcspeak', current_date - 90000, current_date + 10, 50, '4'),
	('In pain. Continuing home oxy with additional 1/2 does of oxy for breakthrough pain (q2h) APS consulted, working on alternate pain regimen'
, 'mcspeak', current_date - 90000, current_date + 10, 50, '4'),
-- Patient 5
	('No steroids unless absolutely necessary - compromises tx', 'collsain', current_date - 90000, current_date + 10, 100, '5'),
	('Large emesis. Decreased bolus feeds and increased frequency.', 'collsain', current_date, current_date + 10, 200, '5'),
	('If sick, suspend enalopril', 'johntyu', current_date - 91000, current_date + 10, 0, '5'),
	('Increased fluid goals', 'mcspeak', current_date - 100000, current_date, 50, '5');

INSERT INTO Task (text, reporter, assignee, reportedDate,status, expiration, priority, patientId)
VALUES 
-- Patient 1
	('11pm check platelets, if <50 give platelets', 'collsain', 'kminchan', current_date, 0, current_date + 5, 200, '1'),
	('3am check platelets, if <50 give platelets', 'collsain', 'johntyu', current_date, 0, current_date + 5, 200, '1'),
-- Patient 2
	('D/C order is in', 'kminchan', 'collsain', current_date, 0, current_date + 5, 150, '2'),
	('MN I/Os If net negative, please add the difference to his IVF', 'mcspeak', 'johntyu', current_date,0,  current_date + 5, 150, '2'),
	('D/C after PRBC, zinecard and adria after 1700 tonight', 'kdkav', 'johntyu', current_date, 0, current_date + 5, 0, '2'),
-- Patient 3
	('D/C after PRBC, zinecard and adria after 1700 tonight', 'kdkav', 'johntyu', current_date, 0, current_date + 5, 0, '3'),
-- Patient 4
	('3am check platelets, if <50 give platelets', 'collsain', 'johntyu', current_date, 0, current_date + 5, 200, '4'),
	('D/C order is in', 'kminchan', 'collsain', current_date, 0, current_date + 5, 150, '4'),
	('MN I/Os If net negative, please add the difference to his IVF', 'mcspeak', 'johntyu', current_date,0,  current_date + 5, 150, '4'),
	('D/C after PRBC, zinecard and adria after 1700 tonight', 'kminchan', 'johntyu', current_date, 0, current_date + 5, 0, '4'),
-- Patient 5
	('11pm check platelets, if <50 give platelets', 'collsain', 'kminchan', current_date, 0, current_date + 5, 200, '5'),
	('3am check platelets, if <50 give platelets', 'collsain', 'johntyu', current_date, 0, current_date + 5, 200, '5'),
	('D/C order is in', 'kminchan', 'collsain', current_date, 0, current_date + 5, 150, '5'),
	('MN I/Os If net negative, please add the difference to his IVF', 'mcspeak', 'johntyu', current_date,0,  current_date + 5, 150, '5'),
	('D/C after PRBC, zinecard and adria after 1700 tonight', 'kminchan', 'johntyu', current_date, 0, current_date + 5, 0, '5');
