package com.yxh.house.config;

import org.mybatis.spring.boot.autoconfigure.MybatisProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

/**
 * 作者: sxy
 * 时间: 2019/3/22
 */
@Configuration
public class MybatisConfig {

    @Autowired
    public void config(MybatisProperties properties){
        properties.setTypeAliasesPackage("com.yxh.house.pojo");
    }
}
