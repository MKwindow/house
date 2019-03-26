package com.yxh.house.pojo;

import lombok.Data;

import java.util.List;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Data
public class HouseAddr{
    private int id;
    private int pid;
    private String name;
    private List<HouseAddr> child;
}
