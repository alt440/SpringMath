package com.math.main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.net.URLDecoder;
import java.util.Scanner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.Model;

@Controller
public class BasicMathController {

	private static int correctAnswers = -1;
	private static int totalAnswers = -1;
	private int timeBetweenEquations = -1;
	private int destination = -1;
	
	@GetMapping("/")
	public String homePage() {
		return "homePage";
	}
	
	@GetMapping("/selectTypeGame")
	public String selectTypeGame() {
		return "selectTypeGame";
	}
	
	@GetMapping("/done")
	public String doneScoreDisplay(Model model) {
		model.addAttribute("correctAnswers", correctAnswers);
		model.addAttribute("totalAnswers", totalAnswers);
		return "gameMathDone";
	}
	
	//was testing animations
	/*@GetMapping("/circleTest")
	public String circleTest() {
		return "circleTest";
	}*/
	
	//this file lets the user select the delay they want to have for timed exams
	@GetMapping("/selectTime")
	public String selectTime() {
		return "selectTime";
	}
	
	@PostMapping("/validateTime")
    @ResponseBody
	public String validateTime(@RequestBody String time) {
		//decode the string before to remove some characters with numbers that represent other characters
		//need to send the button choice of the user so that the page can redirect to the right one after
		try {
    		time = URLDecoder.decode(time, "UTF-8");
    	}
    	catch(Exception ex) {
    		ex.printStackTrace();
    		timeBetweenEquations = 5;
    		return "The input you entered has something wrong. Default value of 5 seconds will be used";
    	}
		int answerGiven = 0;
		try {
    		//takes the first number from the given input. If there is none, return wrong answer.
    		answerGiven = new Scanner(time).useDelimiter("\\D+").nextInt();
    	}
    	catch(NumberFormatException ex) {
    		ex.printStackTrace();
    		timeBetweenEquations = 5;
    		return "The input you entered has something wrong. Default value of 5 seconds will be used";
    	}
    	catch(Exception ex) {
    		//ex.printStackTrace();
    		timeBetweenEquations = 5;
    		return "The input you entered has something wrong. Default value of 5 seconds will be used";
    	}
		
		if(answerGiven>=3 && answerGiven<=30) {
			timeBetweenEquations = answerGiven;
			return "The value you inputted is going to be used as the interval.";
		}
		
		else {
			timeBetweenEquations = 5;
			return "The value you inputted is not within the accepted bounds. Default value of 5 seconds will be used";
		}
	}
	
	@PostMapping("/setDestination")
	@ResponseBody
	public String setDestination(@RequestBody String destinationVal) {
		//this sets the destination address when another address needs to be included between two addresses.
		try {
    		destinationVal = URLDecoder.decode(destinationVal, "UTF-8");
    	}
    	catch(Exception ex) {
    		ex.printStackTrace();
    		destination = 0;
    		return "Destination value was not usable. Redirect to addition.";
    	}
		int answerGiven = 0;
		try {
    		//takes the first number from the given input. If there is none, return wrong answer.
    		answerGiven = new Scanner(destinationVal).useDelimiter("\\D+").nextInt();
    	}
    	catch(NumberFormatException ex) {
    		ex.printStackTrace();
    		destination = 0;
    		return "Destination value was not usable.";
    	}
    	catch(Exception ex) {
    		//ex.printStackTrace();
    		destination = 0;
    		return "Destination value was not usable. Redirect to addition.";
    	}
		
		// 0 stands for addition; 1 for subtraction; 2 for multiplication; 3 for division
		switch(answerGiven) {
		case 0:
		case 1:
		case 2:
		case 3: destination = answerGiven;break;
		default: destination = 0; return "Destination value was not usable. Redirect to addition.";
		}
		
		return "OK";
	}
	
	@GetMapping("/jumpToDestination")
	public String jumpToDestination(RedirectAttributes redirect) {
		//redirecting to another controller with the time value
		redirect.addFlashAttribute("time", timeBetweenEquations);
		switch(destination) {
		case 0: return "redirect:/addition/timed";
		case 1: return "redirect:/subtraction/timed";
		case 2: return "redirect:/multiplication/timed";
		case 3: return "redirect:/division/timed";
		default: return "redirect:/addition/timed";
		}
	}
	
	public static void setCorrectAnswers(int val) {
		correctAnswers = val;
	}
	
	public static void setTotalAnswers(int val) {
		totalAnswers = val;
	}
}
