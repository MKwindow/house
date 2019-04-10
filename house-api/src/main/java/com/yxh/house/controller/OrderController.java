package com.yxh.house.controller;

import com.yxh.house.common.Groups;
import com.yxh.house.common.Response;
import com.yxh.house.pojo.Order;
import com.yxh.house.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("order")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @RequestMapping("add")
    public Response add(Order order){
        return Response.Success(orderService.addOrder(order));
    }
    @RequestMapping("update")
    public Response update(@Validated(value = {Groups.Update.class}) Order order){
        return Response.Success(orderService.updateOrder(order));
    }
    @RequestMapping("list")
    public Response getUsers(
            Integer user_id,
            Integer owen_id,
            Integer close,
            Integer define,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize){
        return Response.Success(orderService.getOrder(user_id,owen_id,close,define,pageNum,pageSize));
    }
}
