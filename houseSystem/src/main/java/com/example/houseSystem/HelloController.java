package com.example.houseSystem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {
	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping("/index/detail")
	public String detail() {
		return "main/detail";
	}
}
