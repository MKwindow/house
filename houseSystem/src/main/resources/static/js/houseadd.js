layui.use('form', function () {
    var form = layui.form;
    house_ajx(form);
    //监听提交
    form.on('submit(up)', function (data) {
        console.log(JSON.stringify(data.field));
        layer.msg(JSON.stringify(data.field));
        return false;
    });
    form.render();
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


function house_ajx(from) {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var search_data = LocalStorage_Day.get("SEARCH");
        if (search_data == null || search_data === "" || typeof search_data === "undefined") {
            $.ajax({
                url: '/json/search.json'
                , type: 'GET'
                , dataType: 'json'//预期服务器返回的数据类型
                , contentType: "application/json; charset=utf-8"
                // , data: data
                , success: function (res) {
                    console.log(JSON.stringify(res));
                    house_tpl(from, res);
                }, error: function (res) {
                    console.log("访问失败:######/t" + JSON.stringify(res));
                }, beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
                }
            });
        } else {
            house_tpl(from, search_data);
        }
    });
}

function house_tpl(from, data) {
    layui.use('laytpl', function () {
        laytpl = layui.laytpl;
        laytpl.config({
            open: '<%',
            close: '%>'
        });
        debugger;
        var getTpl1 = housestyle_tpl.innerHTML,
            view1 = document.getElementById("housestyle_view");
        laytpl(getTpl1).render(data, function (html) {
            view1.innerHTML = html;
            from.render();
        });
        var getTpl2 = area_tpl.innerHTML,
            view2 = document.getElementById("area_view");
        laytpl(getTpl2).render(data, function (html) {
            view2.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        var getTpl3 = style_tpl.innerHTML,
            view3 = document.getElementById("style_view");
        laytpl(getTpl3).render(data, function (html) {
            view3.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        var getTpl4 = payway_tpl.innerHTML,
            view4 = document.getElementById("payway_view");
        laytpl(getTpl4).render(data, function (html) {
            view4.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
    });
}