layui.use(['form', 'jquery', 'layer'], function () {
    let form = layui.form;
    let $ = layui.jquery,
        layer = layui.layer;
    house_ajx(form);
    //监听提交
    form.on('submit(up)', function (data) {
        let fromdata = data.field;
        let url = "http://test.sunxiaoyuan.com:8080/house/add";
        let swap = Apd_add(fromdata);
        let token = getToken_house_add("TOKEN");
        // let swapToken = "Bearer" + "\xa0" + token.access_token;
        let swapToken = {"access_token": token.access_token};
        swap = Object.assign(swap, swapToken);
        $.ajax({
            url: url
            , type: 'GET'
            // , headers: {"Authorization": swapToken}
            , data: swap
            , success: function (rescss) {
                if (rescss.code == 200) {
                    layer.msg('发布成功，马上去看看发布结果', {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        window.location.href = '/showRentManage'
                    });
                }
            }
            , error: function (res) {
                layer.msg('网络开小差，等等就好了', {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        });
        console.log(JSON.stringify(data.field));
        return false;
    });
    form.render();
});
layui.use('upload', function () {
    let upload = layui.upload;
    //执行实例
    //图片
    let token = getToken_house_add("TOKEN");
    try {
        let swapToken = "Bearer" + "\xa0" + token.access_token;
    } catch (err) {
        let open = document.getElementById('btn');
        if (open != null) {
            popwindows();
        } else
            window.location.href = "/index"
    }
    upload.render({
        elem: '#img' //绑定元素
        // , headers: {"Authorization": swapToken}
        , method: 'GET'//默认post
        , url: 'http://test.sunxiaoyuan.com:8080/house/add' //上传接口
        , accept: 'images'
        , field: 'files'
        , auto: false//自动上传
        , bindAction: '#up'//提交按钮 不使用默认提交方式
        , done: function (res) {
            console.log(res);
        }
        , error: function (res) {
            console.log(res);
            //请求异常回调
        }
    });
    //认证文件
    // upload.render({
    //     elem: '#txt' //绑定元素
    //     , url: 'http://test.sunxiaoyuan.com:8080/house/add' //上传接口
    //     , method: 'post'//默认post
    //     , accept: 'file'//文件类型
    //     , field: 'files'
    //     , size: 51200//大小
    //     , exts: 'zip|rar|7z|doc|txt|docx'//允许后缀
    //     , auto: false//自动上传
    //     , bindAction: '#up'//提交按钮 不使用默认提交方式
    //     , done: function (res) {
    //         //上传完毕回调
    //     }
    //     , error: function () {
    //         //请求异常回调
    //     }
    // });
});


function house_ajx(from) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let search_data = LocalStorage_Day.get("SEARCH");
        if (search_data == null || search_data === "" || typeof search_data === "undefined") {
            $.ajax({
                url: '/json/search.json'
                , type: 'GET'
                , dataType: 'json'//预期服务器返回的数据类型
                , contentType: "application/json; charset=utf-8"
                // , data: data
                , success: function (res) {
                    // console.log(JSON.stringify(res));
                    house_tpl(from, res);
                }, error: function (res) {
                    console.log("访问失败:######/t" + JSON.stringify(res));
                }
                // , beforeSend: function (XMLHttpRequest) {
                //     XMLHttpRequest.setRequestHeader("Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
                // }
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
        let getTpl1 = housestyle_tpl.innerHTML,
            view1 = document.getElementById("housestyle_view");
        laytpl(getTpl1).render(data, function (html) {
            view1.innerHTML = html;
            from.render();
        });
        let getTpl2 = area_tpl.innerHTML,
            view2 = document.getElementById("area_view");
        laytpl(getTpl2).render(data, function (html) {
            view2.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        let getTpl3 = style_tpl.innerHTML,
            view3 = document.getElementById("style_view");
        laytpl(getTpl3).render(data, function (html) {
            view3.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        let getTpl4 = payway_tpl.innerHTML,
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

function Apd_add(txt) {
    let type_d = txt.housestyle % 10,
        type_c = parseInt(txt.housestyle / 10 % 10),
        type_b = parseInt(txt.housestyle / 100 % 10),
        type_a = parseInt(txt.housestyle / 1000 % 10),
        pay_b = txt.payway % 10,
        pay_a = parseInt(txt.payway / 10 % 10);
    let newData = new Date().toLocaleDateString();
    let userid = LocalStorage_Day.get("USER").id;
    let swap = {
        "title": txt.housename,
        "area": txt.housearea,
        "addr_id": txt.area,
        "type_d": type_d,
        "type_c": type_c,
        "type_b": type_b,
        "type_a": type_a,
        "pay_b": pay_b,
        "pay_a": pay_a,
        "style": txt.style,
        "addr_detail": txt.houseaddress,
        "rent": txt.zent,
        "info": txt.housefaci,
        "status": 0,
        "user_id": userid,
        "create_time": newData
    };
    return swap;
}

function getToken_house_add(key) {
    debugger;
    let data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
        // debugger
        if (data.expirse != null && data.expirse < new Date().getTime()) {
            localStorage.removeItem(key);
        } else {
            return data.value;
        }
    }
    return null;
}