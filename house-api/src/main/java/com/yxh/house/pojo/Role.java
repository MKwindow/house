package com.yxh.house.pojo;

import com.yxh.house.common.Groups;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotNull;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Data
public class Role implements GrantedAuthority {

    @NotNull(groups = {Groups.Update.class})
    private Integer id;
    @NotNull(groups = {Groups.Insert.class})
    private String roleName;

    @Override
    public String getAuthority() {
        return getRoleName();
    }
}
