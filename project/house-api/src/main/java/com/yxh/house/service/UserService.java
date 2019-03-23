package com.yxh.house.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yxh.house.mapper.UserMapper;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Service
public class UserService implements UserDetailsService {

    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder){
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public int addUserRole(User user, Role role){
        return userMapper.addUserRole(user,role);
    }
    public int updateUserRole(User user, Role role){
        return userMapper.updateUserRole(user,role);
    }

    public int addRole(Role role){
        return userMapper.insertRole(role);
    }
    public int updateRole(Role role){
        return userMapper.updateRole(role);
    }
    public List<Role> selectRoles(Role role){
        return userMapper.selectRoles(role);
    }

    public int addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setPhone("");
        user.setCredit(100);
        user.setStatus(1);
        user.setCreateTime(new Date());
        return userMapper.insertUser(user);
    }
    public int updateUser(User user){
        return userMapper.updateUser(user);
    }
    public PageInfo<User> selectUsers(User user,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<User> users = userMapper.selectUsers(user);
        return new PageInfo<>(users);
    }
    @Override
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        return userMapper.selectUserByName(s);
    }
}
