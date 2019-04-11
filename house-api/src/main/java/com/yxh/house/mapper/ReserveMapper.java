package com.yxh.house.mapper;

import com.yxh.house.pojo.Reserve;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface ReserveMapper {
	int insertReserve(Reserve reserve);

	int updateReserve(Reserve reserve);

	List<Map<Object, Object>> selectReserve(
			@Param("user_id") Integer user_id, 
			@Param("owen_id") Integer owen_id,
			@Param("close") Integer close
			);
}
