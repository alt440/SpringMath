function getOperator(){
	return $.ajax({
		type: "GET",
		url: "/division/operator",
		timeout: 10000,
		success: function(response){
			operator = response;
		},
		error: function(e){
		}
	});
}

function getOperand2(){
	return $.ajax({
		type: "GET",
		url: "/division/operand2",
		timeout: 10000,
		success: function(response){
			var2 = response;
		},
		error: function(e){
			
		}
	});
}

//use encodeURI in the ajax call because tomcat does not support some characters
//contentType: "application/json",
//data: encodeURI(JSON.stringify({operand: var2.toString()})),
function getOperand1(){
	return $.ajax({
		type: "GET",
		url: "/division/operand1",
		timeout: 10000,
		processData:false,
		success: function(response){
			var1 = response;
		},
		error: function(e){
			console.log(e);
		}
	});
}

function getAnswer(answerInput){
	return $.ajax({
		type: "POST",
		url: "/division/answer",
		timeout: 10000,
		contentType: "application/json",
		data: encodeURI(JSON.stringify({answer: answerInput})),
		processData: false,
		success: function(response){
			output = response;
		},
		error: function(e){
			console.log(e);
		}
	})
}

function getTotalAnswersValue(){
	return $.ajax({
		type:"GET",
		url: "/division/score/totalAnswers",
		timeout: 10000,
		success: function(response){
			totalAnswers = response;
		},
		error: function(e){
			console.log(e);
		}
	});
}

function getCorrectAnswersValue(){
	return $.ajax({
		type:"GET",
		url: "/division/score/correctAnswers",
		timeout: 10000,
		success: function(response){
			correctAnswers = response;
		}
	});
}