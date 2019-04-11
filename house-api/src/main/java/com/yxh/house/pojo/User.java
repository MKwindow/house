package com.yxh.house.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yxh.house.common.Groups;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Data
public class User implements UserDetails, Serializable {

    @NotNull(groups = {Groups.Select.class,Groups.Update.class,})
    private Integer id;

    @NotBlank(groups = {Groups.Insert.class})
    private String nickName;

    @NotBlank(groups = {Groups.Insert.class})
    private String username;

    @JsonIgnore @NotBlank(groups = {Groups.Insert.class})
    private String password;

    @Email @NotBlank(groups = {Groups.Insert.class})
    private String email;

    private String phone;
    private Integer credit;
    private Integer status;
    private Date createTime;
    @Size(max = 18,min = 18)
    private String idCard;
    private Integer sex;
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
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
