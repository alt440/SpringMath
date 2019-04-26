package com.math.main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class BasicMathController {

	private static int correctAnswers = -1;
	private static int totalAnswers = -1;
	
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
	
	public static void setCorrectAnswers(int val) {
		correctAnswers = val;
	}
	
	public static void setTotalAnswers(int val) {
		totalAnswers = val;
	}
}
