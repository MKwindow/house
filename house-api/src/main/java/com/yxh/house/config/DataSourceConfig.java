package com.yxh.house.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;


@Configuration
public class DataSourceConfig {
//  @Value("${jdbc_url:jdbc:mysql://sunxiaoyuan.com:3307/house?useUnicode=true&characterEncoding=utf8}")
  @Value("${jdbc_url:jdbc:mysql://localhost:3306/house?useUnicode=true&characterEncoding=utf8}")
  String jdbcUrl;
  @Value("${jdbc_username:root}")
  String jdbcUsername;
  @Value("${jdbc_password}")
  String jdbcPassword;


  @Bean
  public DataSource dataSource(){
    return DataSourceBuilder.create().url(jdbcUrl).username(jdbcUsername).password(jdbcPassword).build();
  }
}