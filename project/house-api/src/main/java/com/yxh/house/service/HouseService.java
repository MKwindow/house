package com.yxh.house.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yxh.house.mapper.HouseMapper;
import com.yxh.house.pojo.House;
import com.yxh.house.pojo.HouseAddr;
import com.yxh.house.pojo.HousePic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Service
public class HouseService {

    private HouseMapper houseMapper;

    @Autowired
    public HouseService(HouseMapper houseMapper) {
        this.houseMapper = houseMapper;
    }

    public int addAddrConfig(HouseAddr houseAddr){
        return houseMapper.insertAddr(houseAddr);
    }

    @Transactional
    public int addHouse(House house, MultipartFile[] files) throws IOException {
        int i = houseMapper.insertHouse(house);
        HousePic housePic = new HousePic();
        if (files == null)
            return i;
        for (MultipartFile multipartFile: files) {
            File file = multipartFile.getResource().getFile();
            String path = file.getPath();
            housePic.setHouse_id(house.getId());
            housePic.setUrl(path);
            housePic.setStatus(1);
            houseMapper.insertHousePic(housePic);
        }
        return i;
    }

    public int updateHouse(House house){
        return houseMapper.updateHouse(house);
    }
    public int updateHousePic(HousePic housePic){
        return houseMapper.updateHousePic(housePic);
    }
    public PageInfo<House> getHouseList(House house,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<House> houses = houseMapper.selectHouseList(house);
        houses.forEach(house1 -> {
            List<HousePic> housePics = houseMapper.selectHousePic(house1.getId());
            house1.setPics(housePics);
        });
        return new PageInfo<>(houses);
    }
}
