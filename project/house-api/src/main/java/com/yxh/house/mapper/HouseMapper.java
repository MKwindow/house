package com.yxh.house.mapper;

import com.yxh.house.pojo.House;
import com.yxh.house.pojo.HouseAddr;
import com.yxh.house.pojo.HousePic;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Mapper
public interface HouseMapper {
    int insertAddr(HouseAddr houseAddr);
    int insertHouse(House house);
    int insertHousePic(HousePic housePic);

    int updateHouse(House house);
    int updateHousePic(HousePic housePic);

    List<HousePic> selectHousePic(int house_id);
    List<House> selectHouseList(House house);

}
