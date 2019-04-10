package com.yxh.house.controller;

import com.yxh.house.common.Groups;
import com.yxh.house.common.Response;
import com.yxh.house.pojo.Reserve;
import com.yxh.house.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("reserve")
public class ReserveController {

    private ReserveService reserveService;

    @Autowired
    public ReserveController(ReserveService reserveService) {
        this.reserveService = reserveService;
    }

    @RequestMapping("add")
    public Response add(Reserve reserve){
        return Response.Success(reserveService.addReserve(reserve));
    }
    @RequestMapping("update")
    public Response update(@Validated(value = {Groups.Update.class}) Reserve reserve){
        return Response.Success(reserveService.updateReserve(reserve));
    }
    @RequestMapping("list")
    public Response getUsers(
            Integer user_id,
            Integer owen_id,
            Integer close,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize){
        return Response.Success(reserveService.getReserveList(user_id,owen_id,close,pageNum,pageSize));
    }
}
