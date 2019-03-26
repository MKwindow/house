package com.yxh.house;

import com.github.pagehelper.PageInfo;
import com.yxh.house.pojo.House;
import com.yxh.house.pojo.HouseAddr;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import com.yxh.house.service.HouseService;
import com.yxh.house.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HouseApiApplicationTests {

    @Autowired
    UserService userService;
    @Autowired
    HouseService houseService;

    @Test
    public void testHouse() throws IOException {
        House house = House.builder()
                .user_id(1)
                .title("test")
                .area(80)
                .rent(1000)
                .type_a(1)
                .type_b(1)
                .type_c(1)
                .type_d(1)
                .style(1)
                .pay_a(1)
                .pay_b(1)
                .info("info")
                .addr_id(2)
                .addr_detail("chongqingshi ************")
                .create_time(new Date())
                .status(1)
                .build();
        for (int i = 0; i < 30; i++) {
            houseService.addHouse(house,null);
        }
        house.setRent(2000);
        houseService.updateHouse(house);

        PageInfo<House> houseList = houseService.getHouseList(House.builder().build(), 3, 10);
        System.out.println(houseList);
    }

    @Test
    public void testConfig(){
        HouseAddr h1 = new HouseAddr();
        h1.setPid(0);
        h1.setName("重庆");
        houseService.addAddrConfig(h1);

        String[] addr = {"渝中区","渝北区","大渡口区","九龙坡区","南岸区","北碚区"};
        for (String s: addr) {
            HouseAddr houseAddr = new HouseAddr();
            houseAddr.setPid(h1.getId());
            houseAddr.setName(s);
            houseService.addAddrConfig(houseAddr);
        }
    }


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
