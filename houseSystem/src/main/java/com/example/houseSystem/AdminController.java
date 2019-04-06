package com.example.houseSystem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {
	// 主页
	@RequestMapping("/admin/index")
	public String index() {
		return "/admin/index";
	}
	@RequestMapping("/admin/login")
	public String login() {
		return "/admin/login";
	}
}
