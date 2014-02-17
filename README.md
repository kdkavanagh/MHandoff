# HandOff Tool for Pediatric Surgeons at Mott

## EECS 481 Team
* Kyle Kavanagh | kdkav@umich.edu | 248-914-8864
* Minchan Kim | kminchan@umich.edu | 973-518-2544
* Colleen Sain | collsain@umich.edu | 734-395-1877
* Matt Speakman | mcspeak@umich.edu | 734-755-9763
* John Yu | johntyu@umich.edu | 734-834-1206

### Project Links
* [Google Drive](https://drive.google.com/a/umich.edu/folderview?id=0B8zz7U-1l1l4Zm1DV01NU1Q4N1U&usp=sharing)
* [Google Group - Dev Team](https://groups.google.com/forum/#!forum/mott-handoff-project-dev-team)
* [Google Group - HCID](https://groups.google.com/forum/#!forum/hcid-2014)

## Setup
* Install Java
The server requires java 1.7+. To check your existing java version, run java -version from the cmdline.  If you need to update, you can get java7 from here
http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

Setup Eclipse/IntelliJ
* Install the IDE, install the maven plugin (m2e) if using eclipse. (This may be already installed if you have the most recent version of eclipse).
* Setup code formatting
*  --Navigate to preferences->java->code style->code Templates->comments->types and set to
    /**
     * @author <Name>
     * @date ${date}
     *
     * ${tags}
    */
*  --Navigate to preferences->java->code style->code formatter->line wrapping and set max line width to 160
*  --Navigate to preferences->java->editor->save actions and check all of the boxes
* If using eclipse, to import the project, go to File->import->maven project, then navigate to the handoff-tool folder in the repo.  I would reccomend after importing the project to right click on the project and choose maven->Update project and maven->download javadoc

* If you want to use maven on the command line, you will have to install it separately from http://maven.apache.org/

* To run the server:
1. From eclipse, create a new maven build configuration with the goals "clean install jetty:run"
2. Run this configuration to start up the server.  This starts a server at https://localhost:8443 and will continue to run until you kill it from the eclipse console

* The server checks for code updates every 10 seconds and will hotswap in your new code.
Servlets can be access at https://localhost:8443/<servletname>.
--To test the hello world servlet, call https://localhost:8443/hello?name=<yournamehere>
--To test the hello Json servlet, call https://localhost:8443/helloJson?name=<yournamehere>



## Documentation
Please leave links to useful documentation and any other information relevant to the project

### Backbone
* [backbonejs.org](http://backbonejs.org/)
* [Backbone Tutorials](http://backbonetutorials.com/)
* [Backbone Overview](http://documentcloud.github.io/backbone/docs/backbone.html)
* [Learn Backbone.js Completely](http://javascriptissexy.com/learn-backbone-js-completely/)
