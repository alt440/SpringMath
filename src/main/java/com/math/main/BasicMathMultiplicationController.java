package com.math.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/multiplication")
public class BasicMathMultiplicationController {

	//doing this in backend in case those values get modified
			private int correctAnswers=0;
			private int totalAnswers=0;
			
			private int operator=-1;
			private int operand1=-1;
			private int operand2=-1;
			
			//making sure that the person does not refresh to get another equation with same score
			private boolean hasOperand1 = false;
			private boolean hasOperand2 = false;
			
		    @GetMapping("/math")
		    public String math() {
		    	//returns the html file named randomMath. Found in src/main/resources/templates
		    	return "randomMathMultiplication";
		    }
		    
		    @GetMapping("/exam")
		    public String exam() {
		    	//returns html file named randomMathMultiplicationExam
		    	return "randomMathMultiplicationExam";
		    }
		    
		  //those are all returning the operator values for a certain equation
		    @GetMapping("/operator")
		    @ResponseBody
		    public int mathDivisionOperator() {
		    	operator = 2;
		    	return operator;
		    }
		    
		    //getting the first operand of the equation (particular for division)
		    //have to do this method only for division AFTER getting the second operand
		    @GetMapping("/operand1")
		    @ResponseBody
		    public int mathOperand1() {
		    	if(!hasOperand1) {
		    		operand1 = (int)(Math.random()*12)+1;
		    	}
		    	hasOperand1 = true;
		    	return operand1;
		    }
		    
		    //getting the second operand of the equation (particular for division. No 0 allowed)
		    @GetMapping("/operand2")
		    @ResponseBody
		    public int mathOperand2() {
		    	if(!hasOperand2) {
		    		operand2 = (int)(Math.random()*12)+1;
		    	}
		    	hasOperand2 = true;
		    	return operand2;
		    }
		    
		    @GetMapping("/score/correctAnswers")
		    @ResponseBody
		    public int getCorrectAnswers() {
		    	return correctAnswers;
		    }
		    
		    @GetMapping("/score/totalAnswers")
		    @ResponseBody
		    public int getTotalAnswers() {
		    	return totalAnswers;
		    }
		    
		    @PostMapping("/answer")
		    @ResponseBody
		    public String isRightAnswerDivision(@RequestBody String answer) {
		    	
		    	//release locks
		    	hasOperand1 = false;
		    	hasOperand2 = false;
		    	
		    	boolean isRightAnswer = Answer.getAnswer(answer, operand1, operator, operand2);
		    	totalAnswers++;
		    	if(isRightAnswer) {
		    		correctAnswers++;
		    		return "Nice Job!";
		    	}
		    	
		    	return "Sorry, Wrong Answer.";
		    }
		    
		    @GetMapping("/timed")
		    public String examTimed() {
		    	return "randomMathMultiplicationExamTimed";
		    }
		    
		    @GetMapping("/done")
		    @ResponseBody
		    public String sendResults() {
		    	BasicMathController.setCorrectAnswers(correctAnswers);
		    	BasicMathController.setTotalAnswers(totalAnswers);
		    	return "OK";
		    }
	
}