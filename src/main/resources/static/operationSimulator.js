// To integrate the simulation to some HTML page, copy the table handling the simulation from the randomMathAddition page.
/*
 * Here is the code you need to copy:
 * <!-- Comments explaining the steps -->
	<label id="commentSimulation" class="simVal"></label>
	<input type="button" id="restartSimulation" value="Restart Addition Simulation"/>
	<!-- Shows the formal way of doing the addition -->
	<table id="simulationTable">
		<!-- This row handles when a certain column of digits surpasses nine -->
		<tr>
			<!-- Intentionally left blank -->
			<td></td>
			<!-- Trailing value from decades -->
			<td class="simVal" id="trailingDecades"></td>
			<!-- Trailing value from units -->
			<td class="simVal" id="trailingUnits"></td>
		</tr>
		<tr>
			<!-- Intentionally left empty -->
			<td></td>
			<!-- These two are for the first operand -->
			<td class="simVal" id="operand1DecadeDigit"></td>
			<td class="simVal" id="operand1UnitDigit"></td>
		</tr>
		<tr>
			<!-- This one is for the operator -->
			<td><img id="operatorSignVal"></td>
			<!-- These are for the second operand -->
			<td class="simVal" id="operand2DecadeDigit"></td>
			<td class="simVal" id="operand2UnitDigit"></td>
		</tr>
		<tr>
			<!-- This will be the equal bar -->
			<td class="simVal" id="equalBar"></td>
			<td class="equalBarExtension simVal"></td>
			<td class="equalBarExtension simVal"></td>
		</tr>
		<tr>
			<!-- Intentionally left empty -->
			<td></td>
			<!-- This will be the answer -->
			<td class="simVal" id="answerDecadeDigit"></td>
			<td class="simVal" id="answerUnitDigit"></td>
		</tr>
	</table>
 * 
 * Once you have that, you need to indicate in your code when do you want your table to show when clicking on 
 * the #submitAnswer button. The #submitAnswer button gets the answer the user has given and validates it.
 * I usually show this simulation after two tries of the operation.
 * The code below hides the table and button automatically as soon as the user submits a new answer.
 * You also need to set the 
 */

var timeouts = [];

$(document).ready(function(){
	//removes the button that allows the simulation of the addition operation to take place
	$("#restartSimulation").hide();
	//set the click function for that button
	/*$("#restartSimulation").click(function(){
		simulateAddition(var1, var2);
	});*/
	
	//set the operator from addition simulation to blank
	$("#operatorSignVal").attr("src","../img/blank.png");
	
	//this must also be included in the page
	$('#submitAnswer').click(function(){
		//this hides the addition simulation whenever the user has not tried twice the answer
		$("#restartSimulation").hide();
		//hides the whole table handling the addition simulation
		$("#simulationTable").hide();
		//hide the comment because otherwise it always appears
		$("#commentSimulation").hide();
		
		//this clears the setTimeout operations that were running. Useful in case someone interrupts the animation by submitting.
		if(timeouts!== undefined && timeouts.length !== 0){
			for(var i=0;i<timeouts.length;i++){
				window.clearTimeout(timeouts[i]);
			}
			
			timeouts = [];
		}
			
	});
	
	$("#restartSimulation").click(function(){
		//this clears the setTimeout operations that were running. Useful in case someone interrupts the animation by restarting the animation.
		if(timeouts!== undefined && timeouts.length !== 0){
			for(var i=0;i<timeouts.length;i++){
				window.clearTimeout(timeouts[i]);
			}
			
			timeouts = [];
		}
	});
});

function simulateAddition(operand1, operand2, isReset){
	
	var timeoutDelay = 5000;
	
	//sets all values back to empty string. Only if isReset !== 0. This is set from simulateMultiplication method.
	if(isReset !== 0)
		initSetup(operand1, operand2);
	$("#operatorSignVal").attr("src", "../img/add.png");
	
	//this pushes the timeout in the list timeouts so I can cancel it if the user presses on another button.
	timeouts.push(setTimeout(function(){
		var rightMostDigitsAddition = operand1%10 + operand2%10;
		$("#commentSimulation").html("Next, sum the right most digits. The result gives "+rightMostDigitsAddition+". Put the result under the equal bar.");
		onTextChange($("#commentSimulation"));//from translateOnChange.js
		$("#answerUnitDigit").html(rightMostDigitsAddition%10);
		if(rightMostDigitsAddition > 9){
			timeouts.push(setTimeout(function(){
				$("#commentSimulation").html("Because the sum of the right most digits is greater than 9, we need to transfer the decade digit of the answer to the decade digits' column.");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				$("#trailingDecades").html(parseInt(rightMostDigitsAddition/10));
				
				timeouts.push(setTimeout(function(){
					$("#commentSimulation").html("Now, we need to sum the decades of each number. Do not forget the extra decade value you added!");
					onTextChange($("#commentSimulation"));//from translateOnChange.js
					$("#answerDecadeDigit").html(parseInt(operand1/10) + parseInt(operand2/10) + parseInt(rightMostDigitsAddition/10));
					
					timeouts.push(setTimeout(function(){
						$("#commentSimulation").html("Finally, we have the answer of the equation under the equal bar.");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
					}, timeoutDelay));
				}, timeoutDelay));
			}, timeoutDelay));
		}
		else{
			timeouts.push(setTimeout(function(){
				//get the result
				$("#commentSimulation").html("Now, we need to sum the decades of each number.");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				$("#answerDecadeDigit").html(parseInt(operand1/10) + parseInt(operand2/10));
				
				timeouts.push(setTimeout(function(){
					$("#commentSimulation").html("Finally, we have the answer of the equation under the equal bar.");
					onTextChange($("#commentSimulation"));//from translateOnChange.js
				}, timeoutDelay));
			}, timeoutDelay));
		}
	}, timeoutDelay));
}

function simulateSubtraction(operand1, operand2){
	
	var timeoutDelay = 5000;
	
	//sets all values back to empty string
	initSetup(operand1, operand2);
	$("#operatorSignVal").attr("src", "../img/subtract.png");
	
	timeouts.push(setTimeout(function(){
		var rightMostDigitsSubtraction = (operand1%10) - (operand2%10);
		$("#commentSimulation").html("Next, subtract the right most digits. The result gives "+rightMostDigitsSubtraction+".");
		onTextChange($("#commentSimulation"));//from translateOnChange.js
		if(rightMostDigitsSubtraction < 0){
			timeouts.push(setTimeout(function(){
				$("#commentSimulation").html("Because the subtraction of the right most digits gives a result lower than 0, we must borrow a unit from the higher position.");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				$("#trailingUnits").html("10");
				operand1-=10;
				$("#operand1DecadeDigit").html(parseInt(operand1/10));
				
				timeouts.push(setTimeout(function(){
					$("#commentSimulation").html("Now, do the subtraction of the units by adding the value you took from the decades.");
					onTextChange($("#commentSimulation"));//from translateOnChange.js
					
					var answer = (10+(operand1%10)) - (operand2%10);
					$("#answerUnitDigit").html(answer);
					
					timeouts.push(setTimeout(function(){
						//do the decades units here
						$("#commentSimulation").html("Once we are done with the subtraction of the units, we do the subtraction of the decades. Below the equal bar is the answer.");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
						//no need for putting an additional unit from the higher position because max val is 24 right now
						$("#answerDecadeDigit").html(parseInt(operand1/10) - parseInt(operand2/10));
					}, timeoutDelay));
					
					//adds animation removing one by one from the number.
					/*var operand1UnitDigit = 10+operand1%10;
					var operand2UnitDigit = operand2%10; 
					var operand2UnitDigitCopy = operand2UnitDigit;
					var timeToWait = 1000;
					while(operand2UnitDigitCopy !== -1){
						setTimeout(function(){ 
							$("#answerUnitDigit").html(operand1UnitDigit+" - "+operand2UnitDigit);
							
							//this will remove the subtraction once the second operand is 0.
							if(operand2UnitDigit === 0){
								timeToWait+=1000;
								setTimeout(function(){
									//add 1 because the process continues to execute and does the -1 operation outside if statement
									operand1UnitDigit+=1;
									
									$("#answerUnitDigit").html(operand1UnitDigit);
									//must continue from here the subtraction
									setTimeout(function(){
										//do the decades units here
										$("#commentSimulation").html("Once we are done with the subtraction of the units, we do the subtraction of the decades.");
										//no need for putting an additional unit from the higher position because max val is 24 right now
										$("#answerDecadeDigit").html(parseInt(operand1/10) - parseInt(operand2/10));
									}, timeoutDelay);
								}, timeToWait);
							}
							
							operand1UnitDigit-=1;
							operand2UnitDigit-=1;
							
						}, timeToWait);
						timeToWait+=1000;
						
						//add this to not let the while loop run forever
						operand2UnitDigitCopy--;
					}*/
					
					
				}, timeoutDelay));
			}, timeoutDelay));
		}
		
		else{
			//Did not set unit digit before because would give a negative number in above scenario (if condition)
			//adds animation removing one by one from the number.
			/*var operand2UnitDigit = operand2%10;
			var operand2UnitDigitCopy = operand2UnitDigit;
			var operand1UnitDigit = operand1%10;
			var timeToWait = 1000;
			
			while(operand2UnitDigitCopy !== -1){
				setTimeout(function(){
					$("#answerUnitDigit").html(operand1UnitDigit+" - "+operand2UnitDigit);
					
					
					if(operand2UnitDigit === 0){
						timeToWait+=1000;
						setTimeout(function(){
							//add 1 because the process continues to execute and does the -1 operation outside if statement
							operand1UnitDigit+=1;
							
							$("#answerUnitDigit").html(operand1UnitDigit);
						}, timeToWait);
					}
					
					operand1UnitDigit-=1;
					operand2UnitDigit-=1;
				}, timeToWait);
				
				timeToWait+=1000;
				operand2UnitDigitCopy--;
			}*/
			
			$("#answerUnitDigit").html(rightMostDigitsSubtraction);
			timeouts.push(setTimeout(function(){
				$("#commentSimulation").html("We complete the operation by subtracting the decades unit together.");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				
				$("#answerDecadeDigit").html(parseInt(operand1/10) - parseInt(operand2/10));
			}, timeoutDelay));
		}
	}, timeoutDelay));
}

function simulateMultiplication(operand1, operand2){
	//blanks the slate. Uses class simVal to do it
	//show the table
	$("#simulationTable").show();
	//reset values to replay the scenario (all values in class simVal)
	$(".simVal").html("");
	
	$("#commentSimulation").html("First, set the values to be vertically aligned.");
	onTextChange($("#commentSimulation"));//from translateOnChange.js
	
	$("#operand10DecadeDigit").html(parseInt(operand1/10));
	$("#operand10UnitDigit").html(operand1%10);
	
	$("#operand20DecadeDigit").html(parseInt(operand2/10));
	$("#operand20UnitDigit").html(operand2%10);
	$("#equalBar").html("--------------");
	$(".equalBarExtension").html("--");
	
	var timeoutDelay = 5000;
	
	$("#operator0SignVal").attr("src", "../img/multiply.png");
	
	//attribute to timeout variable so we can cancel this process later
	timeouts.push(setTimeout(function(){
		//start multiplying the operand1 last digit with second number. Then, operand1 first digit with second number.
		$("#commentSimulation").html("We multiply the last digit of the first number by the last digit of the second number.");
		onTextChange($("#commentSimulation"));//from translateOnChange.js
		
		timeouts.push(setTimeout(function(){
			var answer = (operand1%10) * (operand2%10);
			$("#commentSimulation").html("We need to do "+(operand1%10)+" x "+(operand2%10)+". This gives us a result of "+answer+". The answer is placed below the equal bar.");
			onTextChange($("#commentSimulation"));//from translateOnChange.js
			
			$("#operand1UnitDigit").html(answer%10);
			$("#operand1DecadeDigit").html(parseInt(answer/10));
			
			timeouts.push(setTimeout(function(){
				$("#commentSimulation").html("We now multiply the last digit of the first number by the first digit of the second number.");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				
				timeouts.push(setTimeout(function(){
					var answer2 = (operand1%10) * (parseInt(operand2/10));
					$("#commentSimulation").html("We need to do "+(operand1%10)+" x "+(parseInt(operand2/10))+". This gives us a result of "+answer2+".");
					onTextChange($("#commentSimulation"));//from translateOnChange.js
					
					timeouts.push(setTimeout(function(){
						$("#commentSimulation").html("However, because we are multiplicating by the decade unit of the second operand, we need to multiply our result by 10, and add that to our current result under the equal bar.");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
						
						//decade unit of answer
						$("#operand1DecadeDigit").html(parseInt(answer/10)+answer2%10);
						
						if(answer2 >=10){
							$("#operand1HundredDigit").html(parseInt(answer2/10));
						}
						
						if(parseInt(operand1/10) > 0){
							//if the first operand has two digits
							timeouts.push(setTimeout(function(){
								$("#commentSimulation").html("Now, we have to do multiplications with the decade unit of the first operand. Our results thereon will be multiplied by 10 because of that.");
								onTextChange($("#commentSimulation"));//from translateOnChange.js
								
								timeouts.push(setTimeout(function(){
									$("#commentSimulation").html("We now multiply the first digit of the first operand with the last digit of the second operand.");
									onTextChange($("#commentSimulation"));//from translateOnChange.js
									
									timeouts.push(setTimeout(function(){
										var answer3 = parseInt(operand1/10) * operand2%10;
										$("#commentSimulation").html("We need to do "+parseInt(operand1/10)+" x "+operand2%10+". This gives us a result of "+answer3+". We multiply that answer by 10 and put it under the equal bar.");
										onTextChange($("#commentSimulation"));//from translateOnChange.js
										
										$("#operand2UnitDigit").html("0");
										$("#operand2DecadeDigit").html(answer3%10);
										if(parseInt(answer3/10) !== 0)
											$("#operand2HundredDigit").html(parseInt(answer3/10));
										
										timeouts.push(setTimeout(function(){
											$("#commentSimulation").html("We now multiply the first digit of the first operand with the last digit of the second operand.");
											onTextChange($("#commentSimulation"));//from translateOnChange.js
											
											timeouts.push(setTimeout(function(){
												var answer4 = parseInt(operand1/10) * parseInt(operand2/10);
												$("#commentSimulation").html("We need to do "+parseInt(operand1/10)+" x "+parseInt(operand2/10)+". This gives us a result of "+answer4+". We multiply that answer by 10*10 because we are using the decade unit of the first operand and the second operand.");
												onTextChange($("#commentSimulation"));//from translateOnChange.js
												
												//no need for remainder here
												$("#operand2HundredDigit").html(answer4);
												timeouts.push(setTimeout(function(){
													$("#commentSimulation").html("We now have our second value under the equal bar. Now we must do the addition.");
													onTextChange($("#commentSimulation"));//from translateOnChange.js
													
													timeouts.push(setTimeout(function(){
														var operand1After = (operand1%10)*operand2;
														var operand2After = (parseInt(operand1/10))*operand2*10;//multiply by 10 bc decade value
														//setting the equal bars
														$("#equalBar0").html("--------------");
														$(".equalBarExtension0").html("--");
														simulateAddition(operand1After, operand2After,0);
													}, timeoutDelay));
												}, timeoutDelay));
											}, timeoutDelay));
										}, timeoutDelay));
									}, timeoutDelay));
								}, timeoutDelay));
							}, timeoutDelay));
						}
						else{
							timeouts.push(setTimeout(function(){
								$("#commentSimulation").html("Remember that multiplications by 0 gives 0. That is why we are not stepping through the decade unit multiplication of the first operand. We now have the answer under the equal bar.");
								onTextChange($("#commentSimulation"));//from translateOnChange.js
							}, timeoutDelay));
						}
					}, timeoutDelay));
				}, timeoutDelay));
			}, timeoutDelay));
		}, timeoutDelay));
	}, timeoutDelay));
}

function simulateDivision(operand1, operand2){

	var timeoutDelay = 5000;
	//show the table
	$("#simulationTable").show();
	//reset values to replay the scenario (all values in class simVal)
	$(".simVal").html("");
	
	//set image back to blank
	$("#operator1").attr("src","../img/blank.png");
	$("#operator2").attr("src","../img/blank.png");
	
	$("#commentSimulation").html("First, set the values as shown below.");
	onTextChange($("#commentSimulation"));//from translateOnChange.js
	
	var op1hundredDigit = parseInt(operand1/100);
	var op1decadeDigit = parseInt(operand1/10)%10;
	var op1unitDigit = operand1%10;
	if(op1hundredDigit!=0){
		$("#operand1HundredDigit").html(op1hundredDigit);
	}
	if(op1decadeDigit!=0){
		$("#operand1DecadeDigit").html(op1decadeDigit);
	}
	
	$("#operand1UnitDigit").html(op1unitDigit);
	
	//set the separator
	$("#separator").html("|");
	
	var op2DecadeDigit = parseInt(operand2/10);
	var op2UnitDigit = operand2%10;
	if(op2DecadeDigit!=0){
		$("#operand2DecadeDigit").html(op2DecadeDigit);
	}
	
	$("#operand2UnitDigit").html(op2UnitDigit);
	
	//Now that we have removed all 0s, I start the procedure
	timeouts.push(setTimeout(function(){
		$("#commentSimulation").html("Then, look at how many times the dividend goes into the divisor. To do that, we look into each digit of the dividend individually.");
		onTextChange($("#commentSimulation"));//from translateOnChange.js
	},timeoutDelay));
	
	timeouts.push(setTimeout(function(){
		//start at units. this assumes that dividend is smaller than divisor, thus the dividend can go multiple times in the divisor. 
		if(op1decadeDigit === 0 && op1hundredDigit === 0){
			//compare unit with unit of the two operands
			var maxNbTimes = parseInt(op1unitDigit/op2UnitDigit);
			var val = maxNbTimes*op2UnitDigit;
			$("#firstValUnitDigit").html(val);
			var remainder = op1unitDigit - val;
			$("#firstAnswerUnitDigit").html(remainder);
			$("#operator1").attr("src","../img/subtract.png");
			$("#answerBar1").html("--------");
			$("#answerUnitDigit").html(maxNbTimes);
			$("#commentSimulation").html("How much times do "+op1unitDigit+" go into "+op2UnitDigit+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+op2UnitDigit+" to "+op1unitDigit+".");
			onTextChange($("#commentSimulation"));//from translateOnChange.js
			
			timeouts.push(setTimeout(function(){
				$("#commentSimulation").html("Then, the answer can be found above the dividend. ("+parseInt(operand1/operand2)+")");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
			}, timeoutDelay));
		}
		
		else if(op1hundredDigit === 0){
			
			var maxNbTimes=parseInt(op1decadeDigit/operand2);
			var val = maxNbTimes*operand2;
			var remainder = op1decadeDigit-val;
			
			$("#commentSimulation").html("How much times do "+op1decadeDigit+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+op1decadeDigit+".");
			onTextChange($("#commentSimulation"));//from translateOnChange.js
			if(val === 0){
				timeouts.push(setTimeout(function(){
					$("#commentSimulation").html("Because "+op1decadeDigit+" divided by "+operand2+" gives 0, we need to bring down the next digit.");
					onTextChange($("#commentSimulation"));//from translateOnChange.js
					
					timeouts.push(setTimeout(function(){
						var operand1Val = op1decadeDigit*10+op1unitDigit;
						maxNbTimes = parseInt(operand1Val/operand2);
						val = maxNbTimes*operand2;
						remainder = operand1Val - val;
						
						$("#firstValUnitDigit").html(val%10);
						$("#firstValDecadeDigit").html(parseInt(val/10));
						$("#operator1").attr("src", "../img/subtract.png");
						$("#answerBar1").html("--------");
						$("#answerUnitDigit").html(maxNbTimes);
						
						$("#firstAnswerUnitDigit").html(remainder%10);
						if(parseInt(remainder/10) !== 0){
							$("#firstAnswerDecadeDigit").html(parseInt(remainder/10));
						}
						
						$("#commentSimulation").html("How much times do "+operand1Val+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+operand1Val+".");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
						
					}, timeoutDelay));
					
					timeouts.push(setTimeout(function(){
						$("#commentSimulation").html("Then, the answer can be found above the dividend. ("+parseInt(operand1/operand2)+")");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
					}, timeoutDelay*2));
					
				}, timeoutDelay));
			}
			
			else{
				timeouts.push(setTimeout(function(){
					//here i do the first subtraction then I do the second
					$("#firstValDecadeDigit").html(val%10);
					$("#operator1").attr("src", "../img/subtract.png");
					$("#answerBar1").html("----------");
					$("#answerDecadeDigit").html(maxNbTimes);
					
					$("#firstAnswerDecadeDigit").html(remainder%10);

					timeouts.push(setTimeout(function(){
						//second subtraction
						//bring down second value
						$("#firstAnswerUnitDigit").html(op1unitDigit);
						$("#commentSimulation").html("Then, bring down the unit digit of the dividend.");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
						timeouts.push(setTimeout(function(){
							var decadeVal = remainder%10;
							var operand1Val = decadeVal*10+op1unitDigit;
							maxNbTimes = parseInt(operand1Val/operand2);
							val = operand2*maxNbTimes;
							var valDecadeUnit = parseInt(val/10);
							remainder = operand1Val - val;
							
							$("#operator2").attr("src", "../img/subtract.png");
							$("#answerBar2").html("----------");
							$("#secondValDecadeDigit").html(valDecadeUnit);
							$("#secondValUnitDigit").html(val%10);
							
							$("#secondAnswerDecadeDigit").html(parseInt(remainder/10));
							$("#secondAnswerUnitDigit").html(remainder%10);
							
							$("#answerUnitDigit").html(maxNbTimes);
							
							$("#commentSimulation").html("How much times do "+operand1Val+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+operand1Val+".");
							onTextChange($("#commentSimulation"));//from translateOnChange.js
							
							timeouts.push(setTimeout(function(){
								$("#commentSimulation").html("The answer can be found above the dividend. ("+parseInt(operand1/operand2)+")");
								onTextChange($("#commentSimulation"));//from translateOnChange.js
							},timeoutDelay));
						}, timeoutDelay));						
					}, timeoutDelay));
				}, timeoutDelay));
			}
		}
		
		else{
			//assuming the divisor is greater than 1, because numbers above a 100 have greater divisors than 1
			$("#commentSimulation").html("Because the hundred digit is smaller than the divisor, pull down the decade value.");
			onTextChange($("#commentSimulation"));//from translateOnChange.js
			
			timeouts.push(setTimeout(function(){
				var operand1Val = op1hundredDigit*10+op1decadeDigit;
				var maxNbTimes=parseInt(operand1Val/operand2);
				var val = maxNbTimes*operand2;
				var remainder = operand1Val-val;
				
				$("#commentSimulation").html("How much times do "+operand1Val+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+operand1Val+".");
				onTextChange($("#commentSimulation"));//from translateOnChange.js
				
				if(val === 0){
					timeouts.push(setTimeout(function(){
						$("#commentSimulation").html("Because "+operand1Val+" divided by "+operand2+" gives a result lower than 1, then we need to bring down the next digit.");
						onTextChange($("#commentSimulation"));//from translateOnChange.js
						
						timeouts.push(setTimeout(function(){
							var operand1Val = op1decadeDigit*10+op1unitDigit;
							maxNbTimes = parseInt(operand1Val/operand2);
							val = maxNbTimes*operand2;
							remainder = operand1Val - val;
							
							$("#firstValUnitDigit").html(val%10);
							$("#firstValDecadeDigit").html(parseInt(val/10));
							$("#operator1").attr("src", "../img/subtract.png");
							$("#answerBar1").html("----------");
							$("#answerUnitDigit").html(maxNbTimes);
							
							$("#firstAnswerUnitDigit").html(remainder%10);
							if(parseInt(remainder/10) !== 0){
								$("#firstAnswerDecadeDigit").html(parseInt(remainder/10));
							}
							
							$("#commentSimulation").html("How much times do "+operand1Val+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+operand1Val+".");
							onTextChange($("#commentSimulation"));//from translateOnChange.js
						}, timeoutDelay));
						
						timeouts.push(setTimeout(function(){
							$("#commentSimulation").html("Then, the answer can be found above the dividend. ("+parseInt(operand1/operand2)+")");
							onTextChange($("#commentSimulation"));//from translateOnChange.js
						}, timeoutDelay*2));
						
					}, timeoutDelay));
				}
				
				else{
					timeouts.push(setTimeout(function(){
						//here i do the first subtraction then I do the second
						$("#firstValDecadeDigit").html(val%10);
						$("#firstValHundredDigit").html(parseInt(val/10));
						$("#operator1").attr("src", "../img/subtract.png");
						$("#answerBar1").html("----------");
						$("#answerDecadeDigit").html(maxNbTimes);
						
						$("#firstAnswerDecadeDigit").html(remainder%10);

						timeouts.push(setTimeout(function(){
							//second subtraction
							//bring down second value
							$("#firstAnswerUnitDigit").html(op1unitDigit);
							$("#commentSimulation").html("Then, bring down the unit digit of the dividend.");
							onTextChange($("#commentSimulation"));//from translateOnChange.js
							
							timeouts.push(setTimeout(function(){
								var decadeVal = remainder%10;
								var operand1Val = decadeVal*10+op1unitDigit;
								maxNbTimes = parseInt(operand1Val/operand2);
								val = operand2*maxNbTimes;
								var valDecadeUnit = parseInt(val/10);
								remainder = operand1Val - val;
								
								$("#operator2").attr("src", "../img/subtract.png");
								$("#answerBar2").html("----------");
								$("#secondValDecadeDigit").html(valDecadeUnit);
								$("#secondValUnitDigit").html(val%10);
								
								$("#secondAnswerDecadeDigit").html(parseInt(remainder/10));
								$("#secondAnswerUnitDigit").html(remainder%10);
								
								$("#answerUnitDigit").html(maxNbTimes);
								
								$("#commentSimulation").html("How much times do "+operand1Val+" go into "+operand2+"? It goes "+maxNbTimes+" times, because "+val+" is the closest lower value in multiples of "+operand2+" to "+operand1Val+".");
								onTextChange($("#commentSimulation"));//from translateOnChange.js
								
								timeouts.push(setTimeout(function(){
									$("#commentSimulation").html("The answer can be found above the dividend. ("+parseInt(operand1/operand2)+")");
									onTextChange($("#commentSimulation"));//from translateOnChange.js
								},timeoutDelay));
							}, timeoutDelay));						
						}, timeoutDelay));
					}, timeoutDelay));
				}
			}, timeoutDelay));
			
		}
		
	}, timeoutDelay*2));
}

function initSetup(operand1, operand2){
	//show the table
	$("#simulationTable").show();
	//reset values to replay the scenario (all values in class simVal)
	$(".simVal").html("");
	
	$("#commentSimulation").html("First, set the values to be vertically aligned.");
	onTextChange($("#commentSimulation"));//from translateOnChange.js
	
	$("#operand1DecadeDigit").html(parseInt(operand1/10));
	$("#operand1UnitDigit").html(operand1%10);
	
	$("#operand2DecadeDigit").html(parseInt(operand2/10));
	$("#operand2UnitDigit").html(operand2%10);
	$("#equalBar").html("--------------");
	$(".equalBarExtension").html("--");
}