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

	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping("/index/detail")
	public String detail() {
		return "main/detail";
	}

	@RequestMapping("/search")
	public String search() {
		return "main/search";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addClient(@RequestBody Map<String, String> map) {
		json = JSON.toJSONString(map);
		System.out.println(json);
		return json;
	}

	@RequestMapping(value = "/json", method = RequestMethod.GET, produces = "application/json;charset=UTF-8 ")
	@ResponseBody
	public String json() {
		return json;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String login(@RequestBody Map<String, String> map) {
		System.out.println(map);
		map.clear();
		map.put("小明", "123456");
		json = JSON.toJSONString(map);
		return json;
	}

}