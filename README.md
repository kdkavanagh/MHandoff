# MHandOff Tool for Pediatric Surgeons at Mott

#### Beta Release
* Repository: https://github.com/johntyu/EECS481_EPIC
* There is no executable file for this project. Please follow the setup instructions below.

## EECS 481 Epic/MHandoff Team
* Kyle Kavanagh | kdkav@umich.edu | 248-914-8864
* Minchan Kim | kminchan@umich.edu | 973-518-2544
* Colleen Sain | collsain@umich.edu | 734-395-1877
* Matt Speakman | mcspeak@umich.edu | 734-755-9763
* John Yu | johntyu@umich.edu | 734-834-1206

## Setup
###Install Java
* The server requires java 1.7+. To check your existing java version, run `java -version` from the command line.  If you need to update, you can download [java7](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html).

### Setup Eclipse/IntelliJ
* Install the [Eclipse for Java (Kepler)](http://www.eclipse.org/kepler/)
* Install the maven plugin (m2e) if using eclipse
	* Only if you are using a previous version of Eclipse, e.g. Indigo

### Clone the directory
* From the terminal, run `git clone https://github.com/johntyu/EECS481_EPIC.git`


### Create Tables & Populate DB

* From the PostgreSQL terminal, change into the database directory `\cd /PATH_TO_PROJECT/EECS481_EPIC/db/`
* Run the master database script `\i masterSetup.sql`



### Running the Server (Eclipse)

1. From eclipse, create a `new maven build configuration` with the goals `clean install jetty:run` and run this configuration to start up the server
2. The server starts up at `https://localhost:8443` and will continue to run until you kill it from the eclipse console

The server checks for code updates every 10 seconds and will hotswap in your new code.
