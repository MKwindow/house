package com.yxh.house.pojo;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * 作者: sxy
 * 时间: 2019/3/21
 */
@Data
public class User implements UserDetails, Serializable {

    private int id;
    private String nickName;
    private String username;
    private String password;
    private String phone;
    private String email;
    private int credit;
    private int status;
    private Date createTime;
    private List<Role> roles;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getRoles();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return getStatus()==1;
    }

    @Override
    public boolean isAccountNonLocked() {
        return getStatus()==1;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return getStatus()==1;
    }

    @Override
    public boolean isEnabled() {
        return getStatus()==1;
    }
}
