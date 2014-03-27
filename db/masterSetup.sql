--\cd /Users/e19105/views/EECS481_EPIC/db/
-- \cd /Users/John/Desktop/School/EECS_494/EECS481_EPIC/db

\c postgres

\echo Creating User and Tables
\i createTablesInitial.sql

\echo Initializing data
\i setupData.sql

\echo Inserting dummy data into db
\i insertFakeData.sql