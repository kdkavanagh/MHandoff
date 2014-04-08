# MHandOff Tool for Pediatric Surgeons at Mott

#### Beta Release
* Repository: https://github.com/johntyu/EECS481_EPIC
	* The private repository has been shared with Chris (chriscm2006) & David (davidjns)
* There is **no executable file** for this project. Please follow the setup instructions below.

## EECS 481 Epic/MHandoff Team
* Kyle Kavanagh | kdkav@umich.edu | 248-914-8864
* Minchan Kim | kminchan@umich.edu | 973-518-2544
* Colleen Sain | collsain@umich.edu | 734-395-1877
* Matt Speakman | mcspeak@umich.edu | 734-755-9763
* John Yu | johntyu@umich.edu | 734-834-1206

## Setup
###Install Java
* The server requires java 1.7+. To check your existing java version, run `java -version` from the command line.  If you need to update, you can download [java7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html).

### Setup Eclipse (optional - Only if you need to work on the code)
* Install the [Eclipse for Java (Kepler)](http://www.eclipse.org/kepler/)
* Install the maven plugin (m2e) if using eclipse
	* Only if you are using a previous version of Eclipse, e.g. Indigo

### Setup Maven
* If you did not install eclipse, you will need to have [Maven](http://maven.apache.org/) installed on your machine

### Clone the directory
* From the terminal, run `git clone https://github.com/johntyu/EECS481_EPIC.git`


### Install PostgreSQL
* If using a mac, the easiest way to install PostgreSQL is [PostgreSQL App] (http://postgresapp.com/)
* If using a PC, install PostgreSQL from [Here] (http://www.postgresql.org/download/windows/)

### Create Tables & Populate DB

* In the SQL file <repo>/db/masterSetup.sql, change the database directory to reflect the location of the repo on your machine `\cd /PATH_TO_PROJECT/EECS481_EPIC/db/`
* Run the master database script `\i masterSetup.sql`



### Running the Server (Eclipse)

1. A. From Eclipse, select **Run > Run Configuartions…** and create a `new maven build configuration` with the goals `clean install jetty:run` 
1. B. If you did not install eclipse, run from the command line "mvm clean install jetty:run"
2. Running this configuration will start the server at `https://localhost:8443` 
	* It will continue to run until you kill it from the eclipse console or the command line
	* The server checks for code updates every 10 seconds and will hotswap in your new code.
