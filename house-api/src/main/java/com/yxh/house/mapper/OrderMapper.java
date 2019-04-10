package com.yxh.house.mapper;

import com.yxh.house.pojo.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
	int insertOrder(Order order);

	int updateOrder(Order order);

	List<Map<Object, Object>> selectOrder(
			@Param("user_id") Integer user_id, 
			@Param("owen_id") Integer owen_id,
			@Param("close") Integer close, 
			@Param("define") Integer define);
}
