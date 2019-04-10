package com.yxh.house.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yxh.house.mapper.ReserveMapper;
import com.yxh.house.pojo.Reserve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class ReserveService {
    private ReserveMapper reserveMapper;

    @Autowired
    public ReserveService(ReserveMapper reserveMapper) {
        this.reserveMapper = reserveMapper;
    }

    public int addReserve(Reserve reserve){
        return reserveMapper.insertReserve(reserve);
    }

    public int updateReserve(Reserve reserve){
        return reserveMapper.updateReserve(reserve);
    }

    public PageInfo<Map<Object, Object>> getReserveList(Integer user_id,Integer owen_id,Integer close,int pageNum,int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Map<Object, Object>> maps = reserveMapper.selectReserve(user_id,owen_id,close);
        return new PageInfo<>(maps);
    }
}
