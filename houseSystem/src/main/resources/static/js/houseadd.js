layui.use('form', function () {
    var form = layui.form;
    //监听提交
    form.on('submit(up)', function (data) {
        console.log(JSON.stringify(data.field));
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});
layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例
    //图片
    upload.render({
        elem: '#img' //绑定元素
        , url: '/image/' //上传接口
        , accept: 'images'
        , done: function (res) {
            //上传完毕回调
        }
        , error: function () {
            //请求异常回调
        }
    });
    //认证文件
    upload.render({
        elem: '#txt' //绑定元素
        , url: '/file/' //上传接口
        , method: 'post'//默认post
        , accept: 'file'//文件类型
        , size: 51200//大小
        , exts: 'zip|rar|7z|doc|txt|docx'//允许后缀
        , auto: false//自动上传
        , bindAction: '#up'//提交按钮 不使用默认提交方式
        , done: function (res) {
            //上传完毕回调
        }
        , error: function () {
            //请求异常回调
        }
    });
});