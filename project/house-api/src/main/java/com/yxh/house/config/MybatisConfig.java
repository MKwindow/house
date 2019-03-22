package com.yxh.house.config;

import org.mybatis.spring.boot.autoconfigure.MybatisProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 作者: sxy
 * 时间: 2019/3/22
 */
@Configuration
public class MybatisConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void config(MybatisProperties properties){
        properties.setTypeAliasesPackage("com.yxh.house.pojo");
    }
}
