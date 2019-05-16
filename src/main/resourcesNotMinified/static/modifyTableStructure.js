//for the selectTypeGame.html page
//translateOnChange.js must be before this script!
function addRows(){
	//check first the number of rows. dont want this to be called multiple times
	if($("#typeGames tr").length === 5){
		//removing tds using
		//at row 0, element 1
		for(var i=0;i<5;i++){
			$("#typeGames tr").eq(i).children('td').eq(2).remove();
			$("#typeGames tr").eq(i).children('td').eq(1).remove();
		}
		
		//adding rows using 
		$("#typeGames tr:last").after('<tr>'+
				'<td id="examTitle" class="titleTypeGame translate">Exam</td>'+
				'</tr><tr>'+
				'<td><input id="additionExam" class="addition buttonClass translate" type="button" value="Addition"/></td>'+
				'</tr><tr>'+
				'<td><input id="subtractionExam" class="subtraction buttonClass translate" type="button" value="Subtraction"/></td>'+
				'</tr><tr>'+
				'<td><input id="multiplicationExam" class="multiplication buttonClass translate" type="button" value="Multiplication"/></td>'+
				'</tr><tr>'+
				'<td><input id="divisionExam" class="division buttonClass translate" type="button" value="Division"/></td>'+
				'</tr><tr>'+
				'<td id="timedExamTitle" class="titleTypeGame translate">Timed Exam</td>'+
				'</tr><tr>'+
				'<td><input id="additionTimedExam" class="addition timed buttonClass translate" type="button" value="Addition"/></td>'+
				'</tr><tr>'+
				'<td><input id="subtractionTimedExam" class="subtraction timed buttonClass translate" type="button" value="Subtraction"/></td>'+
				'</tr><tr>'+
				'<td><input id="multiplicationTimedExam" class="multiplication timed buttonClass translate" type="button" value="Multiplication"/></td>'+
				'</tr><tr>'+
				'<td><input id="divisionTimedExam" class="division timed buttonClass translate" type="button" value="Division"/></td>'+
				'</tr>');
		$(".addition").css("-webkit-animation-play-state", "paused");
		$(".subtraction").css("-webkit-animation-play-state", "paused");
		$(".multiplication").css("-webkit-animation-play-state", "paused");
		$(".division").css("-webkit-animation-play-state", "paused");
	}
	onTextChange($(".translate"));
	
}

//for the selectTypeGame.html page
function removeRows(){
	//first check the number of rows so this is not called multiple times
	if($("#typeGames tr").length > 5){
		//remove all the rows
		for (var i=0;i<15;i++){
			$("#typeGames tr:last").remove();
		}
		
		//add the content in children of rows already established
		var tableContent = '<tr>'+
								'<td id="practiceTitle" class="titleTypeGame translate">Practice</td>'+
								'<td id="examTitle" class="titleTypeGame translate">Exam</td>'+
								'<td id="timedExamTitle" class="titleTypeGame translate">Timed Exam</td>'+
							'</tr>'+
							
							'<tr>'+
								'<td><input id="additionPractice" class="addition buttonClass translate" type="button" value="Addition"/></td>'+
								'<td><input id="additionExam" class="addition buttonClass translate" type="button" value="Addition"/></td>'+
								'<td><input id="additionTimedExam" class="addition timed buttonClass translate" type="button" value="Addition"/></td>'+
							'</tr>'+
								
							'<tr>'+
								'<td><input id="subtractionPractice" class="subtraction buttonClass translate" type="button" value="Subtraction"/></td>'+
								'<td><input id="subtractionExam" class="subtraction buttonClass translate" type="button" value="Subtraction"/></td>'+
								'<td><input id="subtractionTimedExam" class="subtraction timed buttonClass translate" type="button" value="Subtraction"/></td>'+
							'</tr>'+
							
							'<tr>'+
								'<td><input id="multiplicationPractice" class="multiplication buttonClass translate" type="button" value="Multiplication"/></td>'+
								'<td><input id="multiplicationExam" class="multiplication buttonClass translate" type="button" value="Multiplication"/></td>'+
								'<td><input id="multiplicationTimedExam" class="multiplication timed buttonClass translate" type="button" value="Multiplication"/></td>'+
							'</tr>'+
							
							'<tr>'+
								'<td><input id="divisionPractice" class="division buttonClass translate" type="button" value="Division"/></td>'+
								'<td><input id="divisionExam" class="division buttonClass translate" type="button" value="Division"/></td>'+
								'<td><input id="divisionTimedExam" class="division timed buttonClass translate" type="button" value="Division"/></td>'+
							'</tr>';
		
		$("#typeGames").append(tableContent);
		$(".addition").css("-webkit-animation-play-state", "paused");
		$(".subtraction").css("-webkit-animation-play-state", "paused");
		$(".multiplication").css("-webkit-animation-play-state", "paused");
		$(".division").css("-webkit-animation-play-state", "paused");
		
		onTextChange($(".translate"));
	}
	
	
}

//for the pages that require input for resolving operations
function addRows2(srcImg, var1, var2, onClickSubmit){
	if($("#tableHBox tr").length === 1){
		//remove row
		$("#tableHBox tr").eq(0).remove();
		//removing tds using
		
		//add a second row
		$("#tableHBox").append('<tr>'+
									'<td><label id="var1" class="vars"></label><img id="operator"><label id="var2" class="vars"></label>'+
									'<img id="equalSign" src="../img/equalSign.png" alt="Equal sign"></td>'+
								'</tr><tr>'+
									'<td><input type="text" id="answerText"></td>'+
								'</tr><tr>'+
									'<td><input type="submit" value="Submit" id="submitAnswer" class="translate"></td>'+
								'</tr>');
		
		$("#operator").attr('src', srcImg);
		//change size of images
		$("#operator").css("width","40px");
		$("#operator").css("height","40px");
		$("#equalSign").css("width", "40px");
		$("#equalSign").css("height","40px");
		$("#var2").html(var2);
		$("#var1").html(var1);
		
		onTextChange($("#submitAnswer"));
		$("#submitAnswer").click(function(){
			onClickSubmit();
		});
	}
}

//for the pages that require input for resolving operations
function removeRows2(srcImg, var1, var2, onClickSubmit){
	if($("#tableHBox tr").length === 3){
		//remove the three rows, then reset
		for (var i=0;i<3;i++){
			$("#tableHBox tr:last").remove();
		}
		
		var tableContent = '<tr>'+
				'<td><label id="var1" class="vars"></label></td>'+
				'<td><img id="operator"></td>'+
				'<td><label id="var2" class="vars"></label></td>'+
				'<td><img id="equalSign" src="../img/equalSign.png" alt="Equal sign"></td>'+
				'<td><input type="text" id="answerText"></td>'+
				'<td><input type="submit" value="Submit" id="submitAnswer"></td>'+
			'</tr>';
		
		$("#tableHBox").append(tableContent);
		$("#operator").attr('src', srcImg);
		$("#var2").html(var2);
		$("#var1").html(var1);
		
		onTextChange($("#submitAnswer"));
		$("#submitAnswer").click(function(){
			onClickSubmit();
		});
	}
	
}