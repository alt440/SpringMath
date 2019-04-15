var var1 = getRandomValue();
		var var2 = getRandomValue();
		var choiceImg = 3;
		
		//to calculate score so far
		var correctAnswers = 0;
		var allQuestions = 0;
		
		//added this line for division
		var1 = getFirstDivisionOperand(var1, var2);
		
		$(document).ready(function(){
			$('#operator').attr('src', srcOperatorImage(choiceImg));
			//setting values of labels
			$('#var1').html(var1);
			$('#var2').html(var2);
			
			//setting values for score
			$('#correctAnswers').html(correctAnswers);
			$('#allQuestions').html(allQuestions);
			
			$('#submitAnswer').click(function(){
				var answer = getAnswer(var1, var2, choiceImg);
				
				if(answer == $('#answerText').val()){
					$('#feedback').html("Nice job!");
					//change equation
					var1 = getRandomValue();
					var2 = getRandomValue();
					
					var1 = getFirstDivisionOperand(var1, var2);
					//increase both total questions and current score
					allQuestions++;
					correctAnswers++;
				}
				else{
					$('#feedback').html("Sorry, wrong answer.");
					//change equation
					var1 = getRandomValue();
					var2 = getRandomValue();
					
					var1 = getFirstDivisionOperand(var1, var2);
					
					//only increase number of total questions
					allQuestions++;
				}
			});
			
			$("#submitAnswer").on('click', function(e){
				setTimeout(function(){
					$('#operator').attr('src', srcOperatorImage(choiceImg));
					//setting values of labels
					$('#var1').html(var1);
					$('#var2').html(var2);
					$('#feedback').html("");
					
					//setting values for score
					$('#correctAnswers').html(correctAnswers);
					$('#allQuestions').html(allQuestions);
				}, 700);
				
			});
		});