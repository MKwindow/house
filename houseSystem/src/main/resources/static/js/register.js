layui.use(['form', 'upload', 'layer', 'jquery'], function () {
    let form = layui.form
        , layer = layui.layer;
    let $ = layui.jquery
        , upload = layui.upload;
    //自定义验证规则
    form.verify({
        nick_name: function (value) {
            if (value.length >= 8) {
                return '最多为8个字符';
            }
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
        , password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repasswod: function (value) {
            let repassvalue = $('#rps').val();
            if (value != repassvalue) {
                return '两次输入的密码不一致!';
            }
        }
        , username: function (value) {
            if (!new RegExp("^[A-Za-z0-9]+$").test(value)) {
                return '用户编号必须为字母或者数组';
            }
        }
    });
    $("input[name='username']").blur(function () {
        let user = $(this).val();
        $.ajax({
            url: 'http://test.sunxiaoyuan.com:8080/user/check',
            type: 'GET',
            data: {'username': user.trim()},
            success: function (res) {
                $('#txt').html("允许使用");
            }, error: function (res) {
                $('#txt').html("重复了");
            }
        });
    });

    //监听提交
    form.on('submit(submit)', function (data) {
        let user = data.field;
        let parm = {
            'username': user.username,
            'nickName': user.nick_name,
            'password': user.password,
            'phone': user.phone,
            'email': user.email,
            'idCard': user.id_card,
            'sex': user.sex,
            'status': 0,
            'create_time': new Date()
        };
        let url = 'http://test.sunxiaoyuan.com:8080/user/add';
        $.ajax({
            url: url,
            type: 'GET',
            data: parm,
            success: function (res) {
                if (res.code === 200) {
                    layer.msg('你已经注册成功了', {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        window.location.href = '/index'
                    });
                }
            }, error: function (res) {
                layer.msg('注册失败', {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        });
        // let parm = JSON.stringify(data.field);
        // $.post(url, parm);
        return false;
    });
    //拖拽上传
    // upload.render({
    //     elem: '#test10'
    //     , url: '/upload/'
    //     , done: function (res) {
    //         console.log(res)
    //     }
    // });
});
