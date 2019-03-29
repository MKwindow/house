package com.example.houseSystem;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.houseSystem.tool.ResponseData;

@Controller
public class ControllerTest {
	String json;

	// 主页
	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	// 详细页
	@RequestMapping(value = "/index/detail")
	public String detail() {
		return "main/detail";
	}

	// 主页搜索功能提交
	@RequestMapping(value = "/index/search", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public ResponseData search(@RequestBody Map<String, String> map) {
		System.out.println(map);
		ResponseData data = ResponseData.ok();
		data = data.putDataValue("url", "/search");
		System.out.println(data);
		return data;
	}

	// 重定向到搜索页面
	@RequestMapping("/search")
	public String helloRedirect() {
		return "main/search";
	}

	// 搜索页 头部搜索功能 提交
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String addClient(@RequestBody Map<String, String> map) {
		System.out.println(map);
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
	public ResponseData login(@RequestBody Map<String, String> map) {
		System.out.println(map);
		ResponseData data = ResponseData.ok();
		data.putDataValue("username", "小明");
		data.putDataValue("token", "6556164");
		System.out.println(data);
		return data;
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
		return "main/house/house_manage";
	}

	// 预定界面页面
	@RequestMapping("/showReserveManage")
	public String showReserveManage() {
		return "main/house/reserve_house_manage";
	}

}