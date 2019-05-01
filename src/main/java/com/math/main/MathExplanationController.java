package com.math.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequestMapping("/explanation")
public class MathExplanationController {
	
	@GetMapping("/addition")
	public String getExplanationAddition() {
		return "explanationAddition";
	}
}
