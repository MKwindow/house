package com.yxh.house.pojo;

import com.yxh.house.common.Groups;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;


@Data
@Builder
public class House {

    public House(@NotNull(groups = Groups.Update.class) Integer id, @NotNull(groups = Groups.Insert.class) Integer user_id, @NotNull(groups = Groups.Insert.class) String title, @NotNull(groups = Groups.Insert.class) Integer area, @NotNull(groups = Groups.Insert.class) Integer rent, @NotNull(groups = Groups.Insert.class) Integer type_a, @NotNull(groups = Groups.Insert.class) Integer type_b, @NotNull(groups = Groups.Insert.class) Integer type_c, @NotNull(groups = Groups.Insert.class) Integer type_d, @NotNull(groups = Groups.Insert.class) Integer style, @NotNull(groups = Groups.Insert.class) Integer pay_a, @NotNull(groups = Groups.Insert.class) Integer pay_b, @NotNull(groups = Groups.Insert.class) String info, @NotNull(groups = Groups.Insert.class) Integer addr_id, @NotNull(groups = Groups.Insert.class) String addr_detail, @NotNull(groups = Groups.Insert.class) Date create_time, @NotNull(groups = Groups.Insert.class) Integer status, List<HousePic> pics) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.area = area;
        this.rent = rent;
        this.type_a = type_a;
        this.type_b = type_b;
        this.type_c = type_c;
        this.type_d = type_d;
        this.style = style;
        this.pay_a = pay_a;
        this.pay_b = pay_b;
        this.info = info;
        this.addr_id = addr_id;
        this.addr_detail = addr_detail;
        this.create_time = create_time;
        this.status = status;
        this.pics = pics;
    }

    public House(){}
    @NotNull(groups = Groups.Update.class)
    private Integer id;
    @NotNull(groups = Groups.Insert.class)
    private Integer user_id;
    @NotNull(groups = Groups.Insert.class)
    private String title;
    @NotNull(groups = Groups.Insert.class)
    private Integer area;
    @NotNull(groups = Groups.Insert.class)
    private Integer rent;
    @NotNull(groups = Groups.Insert.class)
    private Integer type_a;
    @NotNull(groups = Groups.Insert.class)
    private Integer type_b;
    @NotNull(groups = Groups.Insert.class)
    private Integer type_c;
    @NotNull(groups = Groups.Insert.class)
    private Integer type_d;
    @NotNull(groups = Groups.Insert.class)
    private Integer style;
    @NotNull(groups = Groups.Insert.class)
    private Integer pay_a;
    @NotNull(groups = Groups.Insert.class)
    private Integer pay_b;
    @NotNull(groups = Groups.Insert.class)
    private String info;
    @NotNull(groups = Groups.Insert.class)
    private Integer addr_id;
    @NotNull(groups = Groups.Insert.class)
    private String addr_detail;
    @NotNull(groups = Groups.Insert.class)
    private Date create_time;
    @NotNull(groups = Groups.Insert.class)
    private Integer status;

    private List<HousePic> pics;
}