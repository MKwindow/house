package com.yxh.house.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yxh.house.mapper.OrderMapper;
import com.yxh.house.pojo.House;
import com.yxh.house.pojo.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class OrderService {
    private OrderMapper orderMapper;
    private HouseService houseService;

    @Autowired
    public OrderService(OrderMapper orderMapper, HouseService houseService) {
        this.orderMapper = orderMapper;
        this.houseService = houseService;
    }

    public int addOrder(Order order){
        House house = new House();
        house.setId(order.getHouse_id());
        List<Map> list = houseService.getHouseList(house, 1, 1).getList();
        if (!list.isEmpty()){
            order.setSnapshot(list.get(0).toString());
            house.setStatus(2);
            houseService.updateHouse(house);
            return orderMapper.insertOrder(order);
        }
        return 0;
    }

    public int updateOrder(Order order){
        return orderMapper.updateOrder(order);
    }

    public PageInfo<Map<Object, Object>> getOrder(Integer user_id,Integer owen_id, Integer close,Integer define,int pageNum,int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Map<Object, Object>> maps = orderMapper.selectOrder(user_id,owen_id,close,define);
        return new PageInfo<>(maps);
    }
}
