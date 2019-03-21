package com.yxh.house.pojo;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Data
public class Role implements GrantedAuthority {

    private int id;
    private String roleName;

    @Override
    public String getAuthority() {
        return getRoleName();
    }
}
