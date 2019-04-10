package com.yxh.house.mapper;

import com.yxh.house.pojo.House;
import com.yxh.house.pojo.HouseAddr;
import com.yxh.house.pojo.HousePic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Mapper
public interface HouseMapper {
    int insertAddr(HouseAddr houseAddr);
    List<HouseAddr> selectAddr();

    int insertHouse(House house);
    int updateHouse(House house);
    List<Map> selectHouseList(House house);

    int insertHousePic(HousePic housePic);
    int updateHousePic(HousePic housePic);
    List<HousePic> selectHousePic(@Param("house_id") Long house_id);


}
