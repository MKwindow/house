package com.yxh.house.mapper;

import com.yxh.house.pojo.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Mapper
public interface UserMapper {
    User selectUserByName(String username);
}
