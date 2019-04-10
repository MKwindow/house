layui.use(['upload', 'jquery'], function () {
    let upload = layui.upload;
    let $ = layui.jquery;
    let user;
    try {
        user = LocalStorage_Day.get("USER");
    } catch (erro) {
        try {
            get_Lock("USER");
        } catch (err) {
            popwindows("user");
        }
    }
    let swap = {
        "userid": user.id,
        "username": user.nickName,
        "userphone": user.phone,
        "usermail": user.email,
        "attestation": user.status,
        "useridentity": user.idCard,
        "usersex": user.sex
    };
    updateform(swap);
    let token = get_Lock('TOKEN');
    //执行实例
    upload.render({
        elem: '#up' //绑定元素
        , url: '/file/' //上传接口
        , method: 'post'//默认post
        , accept: 'images'//文件类型
        , data:{
            'user_id':user.id,
            'status':0,
            'access_token':token.access_token
        }
        , size: 51200//大小
        , auto: true//自动上传
        // , bindAction: '#up'//提交按钮 不使用默认提交方式
        , done: function (res) {
            layer.msg('添加成功',{icon:1,time:1000})
        }
        , error: function () {
            layer.msg('添加失败',{icon:2,time:1000})
        }
    });

});


//表单
function updateform(data) {
    layui.use('form', function () {
        let form = layui.form;
        form.val("updataform", {
            'userid': data.userid
            , "username": data.username // "name": "value"
            , "usersex": data.usersex === 1 ? '1' : '0'
            , "userphone": data.userphone
            , "usermail": data.usermail
            , "useridentity": data.useridentity
            , "attestation": data.attestation === 1 ? '已认证' : '未认证'
            , 'userdddress': data.userdddress
        });

    });
}

layui.use(['form', 'jquery', 'layer'], function () {
    let form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    //修改用户提交
    let token = LocalStorage_Day.get("TOKEN").access_token;
    form.on('submit(update)', function (data) {
        let userdata = data.field;
        delete userdata.file;
        delete userdata.attestation;
        // delete userdata.useridentity;
        // let swapToken = "Bearer" + "\xa0" + token;
        let swap = {
            'nickName':userdata.username,
            "id": userdata.userid,
            "phone": userdata.userphone,
            "email": userdata.usermail,
            'sex': userdata.usersex,
            'idCard': userdata.useridentity,
            "access_token": token
        };
        $.ajax({
            url: 'http://localhost:8080/user/update'
            , type: 'POST'
            , data: swap
            , success: function (res) {
                layer.msg('恭喜修改成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $.ajax(
                        {
                            url: 'http://test.sunxiaoyuan.com:8080/user/info',
                            type: 'POST',
                            data: {"access_token": token},
                            success: function (opt) {
                                let data = {'value': opt, 'expirse': (new Date().getTime() + 86400000)};
                                localStorage.setItem('USER', JSON.stringify(data));
                                window.location.reload();
                            }
                        });
                });
            },
            error: function (res) {
                layer.msg('噢霍，网络出错了，等等就好', {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                })
            }
        });
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(JSON.stringify(userdata)); //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //修改密码提交
    form.verify({
        password: [
            /^[\S]{0,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) {
            let old = $("input[name='oldpassword']").val().trim();
            if (old !== value) {
                return '密码必须一致'
            }
        }
    });
    form.on('submit(updatepwd)', function (data) {
        let userdata = data.field;
        let parm = {
            "id": userdata.userid
            , "password": userdata.password
            , "access_token": token
        };
        $.ajax({
            url: 'http://localhost:8080/user/update'
            , type: 'POST'
            , data: parm
            , success: function (res) {
                layer.msg('修改成功',{icon:2,time:1000},function () {
                    layer.closeAll();
                    localStorage.removeItem("TOKEN");
                    localStorage.removeItem("USER");
                    window.location.reload();
                });
            }, error: function (res) {
                layer.msg('修改失败',{icon:2,time:1000});
            }
        });
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(userdata); //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});

layui.use(['jquery', 'layer'], function () {
    let $ = layui.jquery;
    let layer = layui.layer;
    $('#updatepwd').click(function () {
        let id = $("input[type='hidden']:first").val().trim();
        $("input[type='hidden']:eq(1)").attr("value", id);
        layer.open({
            type: 1
            , title: '修改密码'
            , shade: [0.3, '#393D49']
            , shadeClose: true
            , content: $('#openpwd')
        });
        // console.log(id);
    });
});

function get_Lock(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
        // debugger
        if (data.expirse != null && data.expirse < new Date().getTime()) {
            localStorage.removeItem(key);
        } else {
            user = data.value;
        }
    }
}