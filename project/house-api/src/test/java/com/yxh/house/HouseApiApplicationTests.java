package com.yxh.house;

import com.github.pagehelper.PageInfo;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import com.yxh.house.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HouseApiApplicationTests {

    @Autowired
    UserService userService;

    @Test
    public void testUserRole(){
        User user = new User();
        user.setId(1);
        Role role = new Role();
        role.setId(1);
        userService.addUserRole(user,role);
        userService.updateUserRole(user,role);
    }

    @Test
    public void testRole(){
        Role role = new Role();
        role.setRoleName("ADMIN");
        Role role1 = new Role();
        role1.setRoleName("USER");
        userService.addRole(role);
        userService.addRole(role1);
        System.out.println(userService.selectRoles(new Role()));
        role.setRoleName("SU");
        userService.updateRole(role);
        System.out.println(userService.selectRoles(new Role()));
    }

    @Test
    public void testUser() {
        User user = new User();
        for (int i = 0; i < 35; i++) {
            user.setNickName(""+i);
            user.setUsername("admin"+i);
            user.setPassword("admin"+i);
            user.setPhone("12345678910");
            user.setEmail("123456@qq.com");
            user.setCredit(100);
            user.setStatus(1);
            user.setCreateTime(new Date());
            Object o = userService.addUser(user);
            System.out.println(user);
        }

        User u = new User();
        u.setId(1);
        u.setNickName("nickName");
        int i = userService.updateUser(u);
        System.out.println(i);

        PageInfo<User> users = userService.selectUsers( new User(), 5, 5);
        System.out.println(users);

        User admin = userService.loadUserByUsername("admin");
        System.out.println(admin);
    }

}
