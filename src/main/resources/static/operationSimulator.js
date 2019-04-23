// To integrate the simulation to some HTML page, copy the table handling the simulation from the randomMathAddition page.
/*
 * Here is the code you need to copy:
 * <!-- Comments explaining the steps -->
	<label id="commentSimulation"></label>
	<input type="button" id="restartSimulation" value="Restart Addition Simulation"/>
	<!-- Shows the formal way of doing the addition -->
	<table id="simulationTable">
		<!-- This row handles when a certain column of digits surpasses nine -->
		<tr>
			<!-- Intentionally left blank -->
			<td></td>
			<!-- Trailing value from decades -->
			<td id="trailingDecades"></td>
			<!-- Trailing value from units -->
			<td id="trailingUnits"></td>
		</tr>
		<tr>
			<!-- Intentionally left empty -->
			<td></td>
			<!-- These two are for the first operand -->
			<td id="operand1DecadeDigit"></td>
			<td id="operand1UnitDigit"></td>
		</tr>
		<tr>
			<!-- This one is for the operator -->
			<td><img id="operatorSignVal"></td>
			<!-- These are for the second operand -->
			<td id="operand2DecadeDigit"></td>
			<td id="operand2UnitDigit"></td>
		</tr>
		<tr>
			<!-- This will be the equal bar -->
			<td id="equalBar"></td>
			<td class="equalBarExtension"></td>
			<td class="equalBarExtension"></td>
		</tr>
		<tr>
			<!-- Intentionally left empty -->
			<td></td>
			<!-- This will be the answer -->
			<td id="answerDecadeDigit"></td>
			<td id="answerUnitDigit"></td>
		</tr>
	</table>
 * 
 * Once you have that, you need to indicate in your code when do you want your table to show when clicking on 
 * the #submitAnswer button. The #submitAnswer button gets the answer the user has given and validates it.
 * I usually show this simulation after two tries of the operation.
 * The code below hides the table and button automatically as soon as the user submits a new answer.
 * You also need to set the 
 */

var timeout = undefined;

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
		if(timeout!== undefined)
			window.clearTimeout(timeout);
	});
});

function simulateAddition(operand1, operand2){
	
	var timeoutDelay = 5000;
	
	//sets all values back to empty string
	initSetup(operand1, operand2);
	$("#operatorSignVal").attr("src", "../img/add.png");
	
	timeout = setTimeout(function(){
		var rightMostDigitsAddition = operand1%10 + operand2%10;
		$("#commentSimulation").html("Next, sum the right most digits. The result gives "+rightMostDigitsAddition+". Put the result under the equal bar.");
		$("#answerUnitDigit").html(rightMostDigitsAddition%10);
		if(rightMostDigitsAddition > 9){
			setTimeout(function(){
				$("#commentSimulation").html("Because the sum of the right most digits is greater than 9, we need to transfer the decade digit to the decade digits' column.");
				$("#trailingDecades").html(parseInt(rightMostDigitsAddition/10));
				
				setTimeout(function(){
					$("#commentSimulation").html("Now, we need to calculate the decades of each number. Do not forget the extra decade value you added!");
					$("#answerDecadeDigit").html(parseInt(operand1/10) + parseInt(operand2/10) + parseInt(rightMostDigitsAddition/10));
					
					setTimeout(function(){
						$("#commentSimulation").html("Finally, we have the answer of the equation under the equal bar.");
					}, timeoutDelay);
				}, timeoutDelay);
			}, timeoutDelay);
		}
		else{
			setTimeout(function(){
				//get the result
				$("#commentSimulation").html("Now, we need to calculate the decades of each number.");
				$("#answerDecadeDigit").html(parseInt(operand1/10) + parseInt(operand2/10));
				
				setTimeout(function(){
					$("#commentSimulation").html("Finally, we have the answer of the equation under the equal bar.");
				}, timeoutDelay);
			}, timeoutDelay);
		}
	}, timeoutDelay);
}

function simulateSubtraction(operand1, operand2){
	
	var timeoutDelay = 5000;
	
	//sets all values back to empty string
	initSetup(operand1, operand2);
	$("#operatorSignVal").attr("src", "../img/subtract.png");
	
	timeout = setTimeout(function(){
		var rightMostDigitsSubtraction = (operand1%10) - (operand2%10);
		$("#commentSimulation").html("Next, subtract the right most digits. The result gives "+rightMostDigitsSubtraction+".");
		if(rightMostDigitsSubtraction < 0){
			setTimeout(function(){
				$("#commentSimulation").html("Because the subtraction of the right most digits gives a result lower than 0, we must borrow a unit from the higher position.");
				$("#trailingUnits").html("10");
				operand1-=10;
				$("#operand1DecadeDigit").html(parseInt(operand1/10));
				
				setTimeout(function(){
					$("#commentSimulation").html("Now, do the subtraction of the units by adding the value you took from the decades.");
					
					var answer = (10+(operand1%10)) - (operand2%10);
					$("#answerUnitDigit").html(answer);
					
					setTimeout(function(){
						//do the decades units here
						$("#commentSimulation").html("Once we are done with the subtraction of the units, we do the subtraction of the decades. Below the equal bar is the answer.");
						//no need for putting an additional unit from the higher position because max val is 24 right now
						$("#answerDecadeDigit").html(parseInt(operand1/10) - parseInt(operand2/10));
					}, timeoutDelay);
					
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
					
					
				}, timeoutDelay);
			}, timeoutDelay);
		}
		
		else{
			//Did not set unit digit before because would give a negative number in above scenario (if condition)
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
			setTimeout(function(){
				$("#commentSimulation").html("We complete the operation by subtracting the decades unit together.");
				$("#answerDecadeDigit").html(parseInt(operand1/10) - parseInt(operand2/10));
			}, timeoutDelay);
		}
	}, timeoutDelay);
}

function initSetup(operand1, operand2){
	//show the table
	$("#additionSimulation").show();
	//reset values to replay the scenario
	$("#commentSimulation").html("");
	$("#operand1DecadeDigit").html("");
	$("#operand1UnitDigit").html("");
	
	$("#operand2DecadeDigit").html("");
	$("#operand2UnitDigit").html("");
	$("#trailingDecades").html("");
	$("#trailingUnits").html("");
	$("#answerUnitDigit").html("");
	$("#answerDecadeDigit").html("");
	
	$("#commentSimulation").html("First, set the values to be vertically aligned.");
	
	$("#operand1DecadeDigit").html(parseInt(operand1/10));
	$("#operand1UnitDigit").html(operand1%10);
	
	$("#operand2DecadeDigit").html(parseInt(operand2/10));
	$("#operand2UnitDigit").html(operand2%10);
	$("#equalBar").html("--------------");
	$(".equalBarExtension").html("--");
}