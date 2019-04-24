package com.math.main;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BasicMathController {

	@GetMapping("/")
	public String homePage() {
		return "homePage";
	}
}
