package com.yxh.house.pojo;

import com.yxh.house.common.Groups;
import lombok.Data;

import javax.validation.constraints.NotNull;


@Data
public class UserPic {
    @NotNull(groups = Groups.Update.class)
    private int id;
    private int user_id;
    private String url;
    private int status;
}
