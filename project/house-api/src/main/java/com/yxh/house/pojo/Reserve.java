package com.yxh.house.pojo;

import lombok.Data;

import java.util.Date;

/**
 * 作者: sxy
 * 时间: 2019/3/25
 */
@Data
public class Reserve {
    private int id;
    private int user_id;
    private Date time;
    private int status;
    private Date create_time;
}
