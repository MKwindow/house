package com.yxh.house.controller;

import com.yxh.house.common.Groups;
import com.yxh.house.common.Response;
import com.yxh.house.pojo.House;
import com.yxh.house.pojo.HousePic;
import com.yxh.house.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


@RestController
@RequestMapping("house")
public class HouseController {

    private HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @RequestMapping("addr_config")
    public Response getAddrConfig(){
        return Response.Success(houseService.getAddrList());
    }

    @RequestMapping("add")
    public Response addHouse(@Validated({Groups.Insert.class})House house, MultipartFile[] files, HttpServletRequest request) throws IOException {
        return Response.Success(houseService.addHouse(request,house,files));
    }
    @RequestMapping("update")
    public Response updateHouse(@Validated({Groups.Update.class})House house){
        return Response.Success(houseService.updateHouse(house));
    }
    @RequestMapping("list")
    public Response getHouseList(
            House house,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize){
        return Response.Success(houseService.getHouseList(house,pageNum,pageSize));
    }


    @RequestMapping("updatePic")
    public Response updateHousePic(@Validated({Groups.Update.class})HousePic housePic){
        return Response.Success(houseService.updateHousePic(housePic));
    }
}
