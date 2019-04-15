package com.math.main;

import java.util.Scanner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
public class BasicMathController {
	
	//doing this in backend in case those values get modified
	private int correctAnswers=0;
	private int totalAnswers=0;
	
	private int operator;
	private int operand1;
	private int operand2;
	
    @GetMapping("/math")
    public String math() {
    	//returns the html file named randomMath. Found in src/main/resources/templates
    	return "randomMathBackend";
    }
    
    @GetMapping("/mathAdd")
    public String mathAdd() {
    	return "randomMathAdd";
    }
    
    @GetMapping("/mathSubtract")
    public String mathSubtract() {
    	return "randomMathSubtract";
    }
    
    @GetMapping("/mathMultiply")
    public String mathMultiply() {
    	return "randomMathMultiply";
    }
    
    @GetMapping("/mathDivision")
    public String mathDivision() {
    	return "randomMathDivision";
    }
    
    //those are all returning the operator values for a certain equation
    @GetMapping("/mathDivision/operator")
    @ResponseBody
    public int mathDivisionOperator() {
    	operator = 3;
    	return operator;
    }
    
    @GetMapping("/mathMultiply/operator")
    @ResponseBody
    public int mathMultiplicationOperator() {
    	operator = 2;
    	return operator;
    }
    
    @GetMapping("/mathSubtraction/operator")
    @ResponseBody
    public int mathSubtractionOperator() {
    	operator = 1;
    	return operator;
    }
    
    @GetMapping("/mathAddition/operator")
    @ResponseBody
    public int mathAdditionOperator() {
    	operator = 0;
    	return operator;
    }
    
    //getting the first operand of the equation (particular for division)
    //have to do this method only for division AFTER getting the second operand
    @GetMapping("/mathDivision/operand1")
    @ResponseBody
    public int mathOperand1Division() {
    	operand1 = (int)(Math.random()*12)+1;
    	operand1 = operand1*operand2;
    	return operand1;
    }
    
    //getting the second operand of the equation (particular for division. No 0 allowed)
    @GetMapping("/mathDivision/operand2")
    @ResponseBody
    public int mathOperand2Division() {
    	operand2 = (int)(Math.random()*12)+1;
    	return operand2;
    }
    
    //getting the second operand of the equation
    @GetMapping("/math/operand2")
    @ResponseBody
    public int mathOperand2() {
    	operand2 = (int)(Math.random()*13);
    	return operand2;
    }
    
    @PostMapping("/math/answer")
    @ResponseBody
    public String isRightAnswer(@RequestBody String answer) {
    	//first convert answer
    	try {
    		answer = URLDecoder.decode(answer, "UTF-8");
    	}
    	catch(Exception ex) {
    		ex.printStackTrace();
    		return "Sorry, wrong answer";
    	}
    	System.out.println("Answer given: "+answer);
    	int answerGiven = -933333333;
    	try {
    		//takes the first number from the given input. If there is none, return wrong answer.
    		answerGiven = new Scanner(answer).useDelimiter("\\D+").nextInt();
    	}
    	catch(NumberFormatException ex) {
    		ex.printStackTrace();
    		return "Sorry, wrong answer";
    	}
    	catch(Exception ex) {
    		//ex.printStackTrace();
    		return "Sorry, wrong answer";
    	}
    	
    	int actualAnswer = 0;
    	switch(operator) {
    		case 0: actualAnswer = operand1+operand2;break;
    		case 1: actualAnswer = operand1-operand2;break;
    		case 2: actualAnswer = operand1*operand2;break;
    		case 3: actualAnswer = operand1/operand2;break;
    	}
    	
    	totalAnswers++;
    	
    	if(actualAnswer == answerGiven) {
    		correctAnswers++;
    		return "Nice job!";
    	}
    	
    	return "Sorry, wrong answer";
    }
    
    @GetMapping("/math/score/correctAnswers")
    @ResponseBody
    public int getCorrectAnswers() {
    	return correctAnswers;
    }
    
    @GetMapping("/math/score/totalAnswers")
    @ResponseBody
    public int getTotalAnswers() {
    	return totalAnswers;
    }
    
}