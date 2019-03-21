package com.yxh.house.service;

import com.yxh.house.mapper.UserMapper;
import com.yxh.house.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Service
public class UserService implements UserDetailsService {

    private UserMapper userMapper;
    @Autowired
    public UserService(UserMapper userMapper){
        this.userMapper = userMapper;
    }


    @Override
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        return userMapper.selectUserByName(s);
    }
}
