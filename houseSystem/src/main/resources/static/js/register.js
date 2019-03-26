layui.use(['form', 'upload'], function () {
    var form = layui.form
        , layer = layui.layer;
    var $ = layui.jquery
        , upload = layui.upload;

    //自定义验证规则
    form.verify({
        username: function (value) {
            if (value.length <= 8) {
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
            var repassvalue = $('#rps').val();
            if (value != repassvalue) {
                return '两次输入的密码不一致!';
            }
        }
    });
    //监听提交
    form.on('submit(submit)', function (data) {
        var url = '';
        var parm = JSON.stringify(data.field);
        $.post(url, parm);
        return false;
    });
    //拖拽上传
    upload.render({
        elem: '#test10'
        , url: '/upload/'
        , done: function (res) {
            console.log(res)
        }
    });
});
