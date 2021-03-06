package com.math.main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping(value = "/addition")
public class BasicMathAdditionController {
	
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
    	correctAnswers=0;
    	totalAnswers=0;
    	operator=-1;
    	operand1=-1;
    	operand2=-1;
    	hasOperand1=false;
    	hasOperand2=false;
    	//returns the html file named randomMathAddition. Found in src/main/resources/templates
    	return "randomMathAddition";
    }
    
    @GetMapping("/exam")
    public String exam() {
    	correctAnswers=0;
    	totalAnswers=0;
    	operator=-1;
    	operand1=-1;
    	operand2=-1;
    	hasOperand1=false;
    	hasOperand2=false;
    	//returns html file named randomMathAdditionExam
    	return "randomMathAdditionExam";
    }
    
    //this URL crashes when no time provided. Thus, must go at selectTime page before coming here.
    @GetMapping("/timed")
    public String examTimed(@ModelAttribute("time") int time, Model model) {
    	correctAnswers=0;
    	totalAnswers=0;
    	operator=-1;
    	operand1=-1;
    	operand2=-1;
    	hasOperand1=false;
    	hasOperand2=false;
    	//gets the time value from the basic math controller /selectTime
    	model.addAttribute("timeVal", time);
    	return "randomMathAdditionExamTimed";
    }
    
    //need to overload URL above in case I am just loading the file without previous referral selectTime? not working.
    /*@GetMapping("/timed")
    public String examTimed2() {
    	//gets the time value from the basic math controller /selectTime
    	return "randomMathAdditionExamTimed";
    }*/
    
    @GetMapping("/done")
    public String sendResults(RedirectAttributes redirect) {
    	redirect.addFlashAttribute("correctAnswers", correctAnswers);
    	redirect.addFlashAttribute("totalAnswers", totalAnswers);
    	if(totalAnswers!=25) {
    		return "redirect:/error";
    	}
    	return "redirect:/done";
    }
    
  //those are all returning the operator values for a certain equation
    @GetMapping("/operator")
    @ResponseBody
    public int mathDivisionOperator() {
    	operator = 0;
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
}
