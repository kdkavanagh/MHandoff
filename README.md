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
* John Yu | johntyu@umich.edu |

## Setup
###Install Java
* The server requires java 1.7+. To check your existing java version, run `java -version` from the command line.  If you need to update, you can download [java7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html).

### Setup Eclipse (if you want to look at the code)
* Install the [Eclipse for Java (Kepler)](http://www.eclipse.org/kepler/)
* Install the maven plugin (m2e) if using eclipse
	* Only if you are using a previous version of Eclipse, e.g. Indigo

### Setup Maven (if you didn't install eclipse)
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

1. Import Existing Maven Project and do that for each folders. "handoff-tool", "EMRConnector", "MiChartConnector"
2. Right click on the projects and go to Maven-> update project
3. A. From "EMRConnector" select Run > Run Configuartions…** and create a `new maven build configuration with goals "clean install"
3. B. If you did not install eclipse, run from the command line "mvn clean install"
4. A. From "MiChartConnector" select Run > Run Configuartions…** and create a `new maven build configuration with goals "clean install"
4. B. If you did not install eclipse, run from the command line "mvn clean install"
5. A. From Eclipse, select **Run > Run Configuartions…** and create a `new maven build configuration` with the goals `clean install jetty:run` 
5. B. If you did not install eclipse, run from the command line "mvn clean install jetty:run"
6. Running this configuration will start the server at `https://localhost:8443` 
	* It will continue to run until you kill it from the eclipse console or the command line
	* The server checks for code updates every 10 seconds and will hotswap in your new code.
7. When you first visit the site, you will see a warning regarding unsigned SSL certificates. This is okay, the site is still secure.  (This is a result of us not paying/sending our SSL certificate to verification sites like VeraSign)
8. You can login to the server with the credentials username="user", password="password"
