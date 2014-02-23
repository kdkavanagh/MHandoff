<%@ page language="java" session="true" contentType="text/html; charset=iso-8859-1" %>
<%@ page import="java.sql.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
	<link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/gridster.css" rel="stylesheet">
    <link href="css/mainlayout.css" rel="stylesheet">
    <link href="css/bootstrap-select.min.css" rel="stylesheet">
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
  
 	<title>Patient View</title>
	
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/underscore.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="js/backbone.js"></script>
    <script src="js/gridster.js"></script>
    <script type="text/javascript" src="js/bootstrap-select.min.js"></script>
    <script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
    
    <script>
	  $(function() {
	    $( "#datepickerNote" ).datepicker();
	  });
	  $(function() {
		 $( "#datepickerTask" ).datepicker();
	  });
	</script>
  
    <script type="text/javascript">
        $(window).on('load', function () {

            $('.selectpicker').selectpicker({
                'selectedText': '2: Important'
            });

            // $('.selectpicker').selectpicker('hide');
        });
    </script>
    
	
</head>


<body>

	<div id="big_wrapper">
	
		<header id="top_header">
			<h2 id="mylogo"> <!--Welcome to John and Cannons Development--> </h2>

		</header>
		
		<nav id="top_menu">
			<ul>
		
			<li><a href="projects.html" id="navbutton">DashBoard</a></li>
			<li><a href="#" id="navbutton">Patient 1</a></li>
			<li><a href="#" id="navbutton">Patient 2</a></li>
			<li><a href="#" id="navbutton">Patient 3</a></li>
			<li><a href="#" id="navbutton">Patient 4</a></li>
			<li><a href="#" id="navbutton">Patient 5</a></li>
			<li><a href="#" id="navbutton">Patient 6</a></li>
			</ul>
		</nav>
	
	<div id="new_div">
	
	<aside id="categories">
			<h4 id="patientName"> Kenny McCormick</h4>
			
			<img src="css/kenny.png" alt="face" width="150" height="200">

			<button class="btn btn-primary btn-md" data-toggle="modal" data-target="#addNoteModal">
				Add Note
			</button>
			
			<!-- Modal -->
			<div class="modal fade" id="addNoteModal" tabindex="-1" role="dialog" 
				aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal"
			         aria-hidden="true">&times;</button>
			        <h4 class="modal-title" id="myModalLabel">Add Note</h4>
			      </div>
				<!-- Modal body -->
			      <div class="modal-body">
			 
					<div class="row">
					  <form class="form-horizontal">
					    <div class="span6">
					      <fieldset>
					        
					        <p id="note">give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin<br/>
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        </p>
					        
					    
					      </fieldset>
					    </div>
					    
						<div class="span6" style="float:left;">
							<legend></legend>
							&nbsp;&nbsp;&nbsp;Priority:
					        <select class="selectpicker" data-style="btn-primary" data-width="200px">
								<option>1: Very Important</option>
							    <option selected>2: Important</option>
							    <option>3: Normal</option>
							</select> 
							
				    	</div>
					  </form>
					</div>
			      </div>
				<!-- Modal body ends-->
				<!-- Modal footer begins-->
				
			      <div class="modal-footer">
			        <span class="assigndate"> Expires: <input type="text" id="datepickerNote"> 
				    </span>
			        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			        <button type="button" class="btn btn-primary">Create Note</button>
			      </div>
			    <!-- Modal footer ends-->
			      
			    </div>
			  </div>
			</div>
			<!-- Modal Ends -->
			<button class="btn btn-primary btn-md" data-toggle="modal" data-target="#addTaskModal">
				Add Task
			</button>
			<!-- Modal -->
			<div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" 
				aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal"
			         aria-hidden="true">&times;</button>
			        <h4 class="modal-title" id="myModalLabel">Add Task</h4>
			      </div>
				<!-- Modal body -->
			      <div class="modal-body">
			 
					<div class="row">
					  <form class="form-horizontal">
					    <div class="span6">
					      <fieldset>
					        
					        <p id="note">give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin<br/>
					        give this man some medicin
					        give this man some medicin
					        give this man some medicin
					        </p>
					        
					    
					      </fieldset>
					    </div>
					    
						<div class="span6">
							<legend></legend>
							Priority:
					        <select class="selectpicker" data-style="btn-primary" data-width="200px">
								<option>1: Very Important</option>
							    <option selected>2: Important</option>
							    <option>3: Normal</option>
							</select> 
							
							<span style="float:right;"> 
								Assign To:
								<select class="selectpicker" data-style="btn-primary" data-width="150px">
									<option>Kenny</option>
							    	<option>Stan</option>
							   		<option>Kyle</option>
							   		<option>Cartman</option>
								</select>  
							</span> <br/>
							
				    	</div>
					  </form>
					</div>
			      </div>
				<!-- Modal body ends-->
				<!-- Modal footer begins-->
			      <div class="modal-footer">
			      	<span class="assigndate" style="color:black"> 
						Assign Date: <input type="text" id="datepickerTask"> 
					</span>
			        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			        <button type="button" class="btn btn-primary">Create Task</button>
			      </div>
			    <!-- Modal footer ends-->
			      
			    </div>
			  </div>
			</div>
			<!-- Modal Ends -->
			
			
			<span class="infos">
				Probably some labs
				&nbsp;blah&nbsp;blah&nbsp;blah
			</span> 
			
			<span class="infos">
				Some other random patient info
				&nbsp;blah&nbsp;blah&nbsp;blah
			</span> 
			
	</aside>
	
	<section id="main_section">
		<article>
			<header>
				<hgroup>
					<h3>Put Note Tiles here</h3>
					
				</hgroup>
			</header>
			<p> tons of notes
			tons of notes
			tons of notes
			tons of notes
			tons of notes
			tons of notes
			tons of notes
			tons of notestons of notes
			
			tons of notes
			tons of notes
			</p>
			
			<footer>
				<p>dumb as fuck</p>
			</footer>		
		</article>
		
	</section>
	
		<aside id="side_news">
		
		<form>
			
		</form>
		
		<section id="skin">
				
			
		</section>

		
			<h4> Tasks</h4>
			Put Tiles here
		</aside>
	
	</div> <!--end to big wrapper-->
	</div>
	
		<footer id="the_footer">
			copyright M-HandOff John Kyle Colleen Matt Min 2014
			
			<br/>
			<a href="#tothetop" id="tothetopbutton">Top</a>
		</footer>
	
		<br/>
	
	</div>
	
	
</body>
</html>