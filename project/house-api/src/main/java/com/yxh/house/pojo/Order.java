package com.yxh.house.pojo;

import lombok.Data;

import java.util.Date;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Data
public class Order {
    private int id;
    private int user_id;
    private int house_id;
    private Date start_time;
    private Date end_time;
    private int status;
    private String remark;
    private String snapshot;
    private Date create_time;
}
