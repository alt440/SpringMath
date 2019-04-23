package com.math.main;

import java.net.URLDecoder;
import java.util.Scanner;

//this class gives the answers
public class Answer {
	
	public static boolean getAnswer(String answer, int operand1, int operator, int operand2) {
		//decode the string before to remove some characters with numbers that represent other characters
		try {
    		answer = URLDecoder.decode(answer, "UTF-8");
    	}
    	catch(Exception ex) {
    		ex.printStackTrace();
    		return false;
    	}
		int answerGiven = 0;
		try {
    		//takes the first number from the given input. If there is none, return wrong answer.
    		answerGiven = new Scanner(answer).useDelimiter("\\D+").nextInt();
    	}
    	catch(NumberFormatException ex) {
    		ex.printStackTrace();
    		return false;
    	}
    	catch(Exception ex) {
    		//ex.printStackTrace();
    		return false;
    	}
    	
    	int actualAnswer = 0;
    	switch(operator) {
    		case 0: actualAnswer = operand1+operand2;break;
    		case 1: actualAnswer = operand1-operand2;break;
    		case 2: actualAnswer = operand1*operand2;break;
    		case 3: actualAnswer = operand1/operand2;break;
    	}
    	
    	//totalAnswers++;
    	
    	if(actualAnswer == answerGiven) {
    		//correctAnswers++;
    		return true;
    	}
    	
    	return false;
	}

}
