package com.example.houseSystem;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.example.houseSystem.tool.ResponseData;

@Controller
public class ControllerTest {
	String json;

	// 主页
	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping("/test")
	public String test() {
		return "test";
	}

	// 详细页请求
	@RequestMapping(value = "/index/detail", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public ResponseData detail(@RequestBody Map<String, String> map) {
		System.out.println(map);
		ResponseData data = ResponseData.ok();
		data = data.putDataValue("url", "/index/show_detail");
		System.out.println(JSON.toJSONString(data));
		return data;
	}

	// 详细页显示
	@RequestMapping(value = "/index/show_detail")
	public String showdetail() {
		return "main/detail";
	}

	// 房屋房东预定管理页面
	@RequestMapping(value = "/index/reserveHouseManage")
	public String reserveHouseManage() {
		return "main/reserve/reserve_house_manage";
	}

	// 房屋用户预定管理页面
	@RequestMapping(value = "/index/reserveTenantManage")
	public String reserveTenantManage() {
		return "main/reserve/reserv_tenant_manage";
	}

	// 主页搜索功能提交
	@RequestMapping(value = "/index/search", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public ResponseData search(@RequestBody Map<String, String> map) {
		System.out.println(map);
		ResponseData data = ResponseData.ok();
		data = data.putDataValue("url", "/search");
		System.out.println(JSON.toJSONString(data));
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
		System.out.println(JSON.toJSONString(data));
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

	// 租客合同管理页面
	@RequestMapping("/showTentantManage")
	public String showTentantManage() {
		return "main/order/order_tenant_manage";
	}

	// 租客合同管理页面
	@RequestMapping("/showOwnerManage")
	public String showOwnerManage() {
		return "main/order/order_owner_manage";
	}

}