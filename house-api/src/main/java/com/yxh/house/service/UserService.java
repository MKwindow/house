package com.yxh.house.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.util.StringUtil;
import com.yxh.house.mapper.UserMapper;
import com.yxh.house.pojo.Role;
import com.yxh.house.pojo.User;
import com.yxh.house.pojo.UserPic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;


@Service
public class UserService implements UserDetailsService {

    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder){
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<String> addHousePic(MultipartFile[] files, HttpServletRequest request, Integer user_id,Integer status) throws IOException {
        LinkedList<String> list = new LinkedList<>();
        for (MultipartFile file: files) {
            if (file.isEmpty()){
                continue;
            }
            //服务器地址
            String localString = "http://"+request.getServerName() +":"+ request.getServerPort();
            // 构建上传文件的存放路径
            String path = request.getServletContext().getRealPath("/upload/");
            // 获取上传的文件名称，并结合存放路径，构建新的文件名称
            String filename = file.getOriginalFilename();
            File filepath = new File(path, filename);

            // 判断路径是否存在，不存在则新创建一个
            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();
            }
            // 将上传文件保存到目标文件目录
            String uuid = UUID.randomUUID().toString();
            String s = path + uuid + filename;
            String s1 = localString +"/upload/" + uuid + filename;
            file.transferTo(new File(s));
            UserPic userPic = new UserPic();
            userPic.setUser_id(user_id);
            userPic.setUrl(s1);
            userPic.setStatus(status);
            userMapper.insertUserPic(userPic);
            list.add(s);
        }
        return list;
    }

    public int addUserRole(User user, Role role){
        return userMapper.addUserRole(user,role);
    }
    public int updateUserRole(User user, Role role){
        return userMapper.updateUserRole(user,role);
    }

    public int addRole(Role role){
        return userMapper.insertRole(role);
    }
    public int updateRole(Role role){
        return userMapper.updateRole(role);
    }
    public List<Role> selectRoles(Role role){
        return userMapper.selectRoles(role);
    }

    public int addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setPhone("");
        user.setCredit(100);
        user.setStatus(1);
        user.setCreateTime(new Date());
        return userMapper.insertUser(user);
    }
    public int updateUser(User user){
        if (StringUtil.isNotEmpty(user.getPassword())){
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        }else {
            user.setPassword(null);
        }
        return userMapper.updateUser(user);
    }
    public PageInfo<User> selectUsers(User user,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize);
        List<User> users = userMapper.selectUsers(user);
        return new PageInfo<>(users);
    }
    @Override
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        return userMapper.selectUserByName(s);
    }
}
