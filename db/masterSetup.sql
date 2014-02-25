\cd Path/to/EECS481_EPIC/db/

\c postgres

\echo Creating User and Tables
\i createTablesInitial.sql

\echo Inserting dummy data into db
\i insertFakeData.sql