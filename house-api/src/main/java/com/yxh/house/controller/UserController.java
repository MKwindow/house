package com.yxh.house.controller;

import com.yxh.house.common.Groups;
import com.yxh.house.common.Response;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import com.yxh.house.service.HouseService;
import com.yxh.house.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


@RestController
public class UserController {

    private UserService userService;
    private HouseService houseService;

    @Autowired
    public UserController(UserService userService, HouseService houseService) {
        this.userService = userService;
        this.houseService = houseService;
    }

    @RequestMapping("/user/check")
    public Response check(String username){
        User user = userService.loadUserByUsername(username);
        return Response.Success(user==null);
    }

    @RequestMapping("upload")
    public Response upload(MultipartFile[] files, HttpServletRequest request, Integer user_id, Integer house_id,Integer status) throws IOException {
        if (user_id != null) {
            return Response.Success(userService.addHousePic(files, request, user_id,status));
        }
        if (house_id != null){
            return Response.Success(houseService.addHousePic(files,request,house_id,status));
        }
        return Response.Success();
    }

    @RequestMapping("user/info")
    public Response getUserInfo(){
        String username = (String)SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        User user = userService.loadUserByUsername(username);
        return Response.Success(user);

    }

    @RequestMapping("user/add")
    public Response addUser(@Validated(Groups.Insert.class) User user){
        return Response.Success(userService.addUser(user));
    }

    @RequestMapping("user/update")
    public Response updateUser(@Validated(Groups.Update.class)User user){
        return Response.Success(userService.updateUser(user));
    }

    @RequestMapping("user/list")
    public Response getUsers(
            User user,
            @RequestParam(defaultValue = "1") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize){
        return Response.Success(userService.selectUsers(user,pageNum,pageSize));
    }

    @RequestMapping("role/add")
    public Response addRole(@Validated(Groups.Insert.class)Role role){
        return Response.Success(userService.addRole(role));
    }
    @RequestMapping("role/update")
    public Response updateRole(@Validated(Groups.Update.class)Role role){
        return Response.Success(userService.updateRole(role));
    }
    @RequestMapping("role/list")
    public Response getRoles(Role role){
        return Response.Success(userService.selectRoles(role));
    }

    @RequestMapping("user/bindRole")
    public Response bindRole(@Validated(Groups.Update.class)User user, @Validated(Groups.Update.class)Role role){
        return Response.Success(userService.addUserRole(user, role));
    }
    @RequestMapping("user/removeRole")
    public Response removeRole(@Validated(Groups.Update.class)User user, @Validated(Groups.Update.class)Role role){
        return Response.Success(userService.updateUserRole(user, role));
    }

}
