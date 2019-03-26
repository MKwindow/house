package com.example.houseSystem;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

@Controller
public class HelloController {
	String json;

	// 主页
	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	// 详细页
	@RequestMapping("/index/detail")
	public String detail() {
		return "main/detail";
	}

	// 搜索页
	@RequestMapping("/search")
	public String search() {
		return "main/search";
	}

	// 搜索页 搜索提交
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addClient(@RequestBody Map<String, String> map) {
		json = JSON.toJSONString(map);
		System.out.println(json);
		return json;
	}

	// json测试
	@RequestMapping(value = "/json", method = RequestMethod.GET, produces = "application/json;charset=UTF-8 ")
	@ResponseBody
	public String json() {
		return json;
	}

	// 登陆页请求
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String login(@RequestBody Map<String, String> map) {
		System.out.println(map);
		map.clear();
		map.put("小明", "123456");
		json = JSON.toJSONString(map);
		return json;
	}

	// 房屋发布页面
	@RequestMapping("/houseadd")
	public String houseradd() {
		return "main/houseadd";
	}

	// 个人信息页面
	@RequestMapping("/showuser")
	public String showuser() {
		return "main/showuser";
	}

	// 个人注册页面
	@RequestMapping("/register")
	public String register() {
		return "main/register";
	}

	// 房屋管理页面
	@RequestMapping("/showRentManage")
	public String showRentManage() {
		return "main/rent/rent_manage";
	}

}