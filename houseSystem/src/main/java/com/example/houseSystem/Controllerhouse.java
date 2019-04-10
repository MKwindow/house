package com.example.houseSystem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Controllerhouse {

	// 主页
	@RequestMapping(value = { "/index", "/" })
	public String index() {
		return "index";
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

	// 重定向到搜索页面
	@RequestMapping("/search")
	public String helloRedirect() {
		return "main/search";
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

	// 房东合同管理页面
	@RequestMapping("/showOwnerManage")
	public String showOwnerManage() {
		return "main/order/order_owner_manage";
	}
	
	
}