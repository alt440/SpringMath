function init(){
	//pause it at start of program
	$(".addition").css("-webkit-animation-play-state", "paused");
	$(".subtraction").css("-webkit-animation-play-state", "paused");
	$(".multiplication").css("-webkit-animation-play-state", "paused");
	$(".division").css("-webkit-animation-play-state", "paused");
	//adding animation on mouse hover over button
	$("#additionPractice").mouseover(function(){
		$("#additionPractice").css("-webkit-animation-play-state", "running");	
	});
	$("#additionPractice").mouseout(function(){
		reset_animation('additionPractice');
		$("#additionPractice").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#additionExam").mouseover(function(){
		$("#additionExam").css("-webkit-animation-play-state", "running");	
	});
	$("#additionExam").mouseout(function(){
		reset_animation('additionExam');
		$("#additionExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#subtractionPractice").mouseover(function(){
		$("#subtractionPractice").css("-webkit-animation-play-state", "running");	
	});
	$("#subtractionPractice").mouseout(function(){
		reset_animation('subtractionPractice');
		$("#subtractionPractice").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#subtractionExam").mouseover(function(){
		$("#subtractionExam").css("-webkit-animation-play-state", "running");	
	});
	$("#subtractionExam").mouseout(function(){
		reset_animation('subtractionExam');
		$("#subtractionExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#multiplicationPractice").mouseover(function(){
		$("#multiplicationPractice").css("-webkit-animation-play-state", "running");	
	});
	$("#multiplicationPractice").mouseout(function(){
		reset_animation('multiplicationPractice');
		$("#multiplicationPractice").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#multiplicationExam").mouseover(function(){
		$("#multiplicationExam").css("-webkit-animation-play-state", "running");	
	});
	$("#multiplicationExam").mouseout(function(){
		reset_animation('multiplicationExam');
		$("#multiplicationExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#divisionPractice").mouseover(function(){
		$("#divisionPractice").css("-webkit-animation-play-state", "running");	
	});
	$("#divisionPractice").mouseout(function(){
		reset_animation('divisionPractice');
		$("#divisionPractice").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#divisionExam").mouseover(function(){
		$("#divisionExam").css("-webkit-animation-play-state", "running");	
	});
	$("#divisionExam").mouseout(function(){
		reset_animation('divisionExam');
		$("#divisionExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#additionTimedExam").mouseover(function(){
		$("#additionTimedExam").css("-webkit-animation-play-state", "running");	
	});
	$("#additionTimedExam").mouseout(function(){
		reset_animation('additionTimedExam');
		$("#additionTimedExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#multiplicationTimedExam").mouseover(function(){
		$("#multiplicationTimedExam").css("-webkit-animation-play-state", "running");	
	});
	$("#multiplicationTimedExam").mouseout(function(){
		reset_animation('multiplicationTimedExam');
		$("#multiplicationTimedExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#divisionTimedExam").mouseover(function(){
		$("#divisionTimedExam").css("-webkit-animation-play-state", "running");	
	});
	$("#divisionTimedExam").mouseout(function(){
		reset_animation('divisionTimedExam');
		$("#divisionTimedExam").css("-webkit-animation-play-state", "paused");				
	});
	
	$("#subtractionTimedExam").mouseover(function(){
		$("#subtractionTimedExam").css("-webkit-animation-play-state", "running");	
	});
	$("#subtractionTimedExam").mouseout(function(){
		reset_animation('subtractionTimedExam');
		$("#subtractionTimedExam").css("-webkit-animation-play-state", "paused");				
	});
	
	//adding click actions on the buttons
	$("#additionPractice").click(function(){
		window.location.href="/addition/math";
	});
	
	$("#additionExam").click(function(){
		window.location.href="/addition/exam";
	});
	
	$("#subtractionPractice").click(function(){
		window.location.href="/subtraction/math";
	});
	
	$("#subtractionExam").click(function(){
		window.location.href="/subtraction/exam";
	});
	
	$("#multiplicationPractice").click(function(){
		window.location.href="/multiplication/math";
	});
	
	$("#multiplicationExam").click(function(){
		window.location.href="/multiplication/exam";
	});
	
	$("#divisionPractice").click(function(){
		window.location.href="/division/math";
	});
	
	$("#divisionExam").click(function(){
		window.location.href="/division/exam";
	});
	
	//timed exam
	$("#additionTimedExam").click(function(){
		setDestination(0);
	});
	
	$("#subtractionTimedExam").click(function(){
		setDestination(1);
	});
	
	$("#multiplicationTimedExam").click(function(){
		setDestination(2);
	});
	
	$("#divisionTimedExam").click(function(){
		setDestination(3);
	});
}


//ajax call
function setDestination(val){
	return $.ajax({
		type: "POST",
		url: "/setDestination",
		timeout: 10000,
		contentType: "application/json",
		data: encodeURI(JSON.stringify({destinationVal: val})),
		processData: false,
		success: function(){
			//redirect to set time page
			window.location.href="/selectTime";
		},
		error: function(e){
			console.log(e);
		}
	});
}