package com.yxh.house.controller;

import com.yxh.house.common.Groups;
import com.yxh.house.common.Response;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import com.yxh.house.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 作者: sxy
 * 时间: 2019/3/22
 */
@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
