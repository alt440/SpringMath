function initBallImgsBlank(){
	//setting the values of sources to nothing
	$('[id^="op1ball"]').attr("src", "../img/blank.png");
	$('[id^="op2ball"]').attr("src", "../img/blank.png");
	$('[id^="ansball"]').attr("src", "../img/blank.png");
}

function ballHandling(operand1, operand2){
	//resetting the values of sources to nothing
	$('[id^="op1ball"]').attr("src", "../img/blank.png");
	$('[id^="op2ball"]').attr("src", "../img/blank.png");
	$('[id^="ansball"]').attr("src", "../img/blank.png");
	$('[id^="op1ball"]').hide();
	
	//setting the ball images (test)
	var row = 0;
	var column = 0;
	
	//increasing the delay of each timeout after each iterations, 
	//because we want 300ms delay for first event, 600ms for next, ...
	var timeToWait = 0;
	
	//this updates the row/column inside the setTimeout
	var currentRow = 0;
	var currentColumn = 0;
	
	//updates the value of the operand with the count of shown balls
	var ballCount = 0;
	$("#var1").html(ballCount);
	
	//var1 is operand1
	for(var i =0;i< operand1; i++){
		$("#op1ball"+row+column).attr("src","../img/ball.png");
		
		setTimeout(function(){
			$("#op1ball"+currentRow+currentColumn).fadeIn(600);
			ballCount++;
			
			//update ball count as we add ball images
			$("#var1").html(ballCount);
			currentColumn++;
			if(currentColumn==5){
				currentRow++;
				currentColumn=0;
			}
			
			if(currentRow*5+currentColumn == operand1){
				op2BallHandling(operand2);
			}
		}, timeToWait);
		
		column++;
		if(column == 5){
			row++;
			//restarting to beginning of row
			column = 0;
		}
		
		timeToWait+=300;
	}
	
}

function op2BallHandling(operand2){
	
	$('[id^="op2ball"]').hide();
	
	$('#feedback').html("Below is a visual representation of the number of balls. \nAdd them all together and you should get the right answer.");
	
	//setting the ball images (test)
	var row = 0;
	var column = 0;
	
	//increasing the delay of each timeout after each iterations, 
	//because we want 300ms delay for first event, 600ms for next, ...
	var timeToWait = 0;
	
	//this updates the row/column inside the setTimeout
	var currentRow = 0;
	var currentColumn = 0;
	
	//updates the value of the operand with the count of shown balls
	var ballCount = 0;
	$("#var2").html(ballCount);
	
	//var2 is operand2
	for(var i =0;i< operand2; i++){
		$("#op2ball"+row+column).attr("src","../img/blueBall.png");
		
		setTimeout(function(){
			$("#op2ball"+currentRow+currentColumn).fadeIn(600);
			ballCount++;
			$("#var2").html(ballCount);
			currentColumn++;
			if(currentColumn==5){
				currentRow++;
				currentColumn=0;
			}

		}, timeToWait);
		
		column++;
		if(column == 5){
			row++;
			//restarting to beginning of row
			column = 0;
		}
		
		timeToWait+=300;
	}
}

//handling the balls in answer
//only for addition!
function ansBallHandling(operand1, operand2){
	//resetting the values of sources to nothing
	$('[id^="ansball"]').attr("src", "../img/blank.png");
	$('[id^="ansball"]').hide();
	
	//setting the ball images (test)
	var row = 0;
	var column = 0;
	
	//row and column from operand1 table
	var op1Row = 0;
	var op1Column = 0;
	
	var op2Row = 0;
	var op2Column = 0;
	
	//calculating time to wait for each
	var timeToWait = 0;
	
	var answerVal = 0;
	
	//var1 is operand1
	for(var i =0;i< operand1; i++){
		setTimeout(function(){
			//fade in/ fade out replacement between operand and answer
			$("#ansball"+row+column).attr("src","../img/ball.png");
			$("#ansball"+row+column).fadeIn(600);
			$("#op1ball"+op1Row+op1Column).fadeOut(600);
			$("#op1ball"+op1Row+op1Column).attr("src","../img/blank.png");
			
			//change the text in answer and text in operand
			$("#answerText").val(++answerVal);
			
			column++;
			if(column == 5){
				row++;
				//restarting to beginning of row
				column = 0;
			}
			
			op1Column++;
			if(op1Column == 5){
				op1Row++;
				op1Column=0;
			}
		}, timeToWait);
		
		
		
		timeToWait+=600;
	}
	
	//var2 is operand2
	for(var i=0;i<operand2; i++){
		setTimeout(function(){
			//fade in/ fade out replacement between operand and answer
			$("#ansball"+row+column).attr("src","../img/blueBall.png");
			$("#ansball"+row+column).fadeIn(600);
			$("#op2ball"+op2Row+op2Column).fadeOut(600);
			$("#op2ball"+op2Row+op2Column).attr("src","../img/blank.png");
			
			//change the text in answer and text in operand
			$("#answerText").val(++answerVal);
			
			column++;
			if(column == 5){
				row++;
				//restarting to beginning of row
				column = 0;
			}
			
			op2Column++;
			if(op2Column == 5){
				op2Row++;
				op2Column=0;
			}
		}, timeToWait);
		
		timeToWait+=600;
	}
}