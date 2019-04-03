function nva() {
    // 导航条
    layui.use(['element', 'jquery', "layer"], function () {
        var layer = layui.layer;
        var element = layui.element; // 导航的hover效果、二级菜单等功能，需要依赖element模块
        var $ = layui.jquery;
        var parent = $('#showname').parentsUntil("ul").find("dl:first");
        try {
            var username = LocalStorage_Day.get("USER").username;
        } catch (err) {
            parent.removeClass("layui-nav-child");// 设置为展开之前的css，即不展开的样式
        }

        // 监听导航点击
        element.on('nav(loginfilter)', function (elem) {
            var id = $(elem).attr("id");
            debugger;
            switch (id) {
                case "loginout_top": {
                    logout();
                    element.render('nav');
                }
                case "btn_parm_top": {
                    element.render('nav');
                    var user = document.getElementById("showname").innerText.trim();
                    var oldlogin = $.trim(user) + "";
                    if (encodeURIComponent(oldlogin) === "%E7%99%BB%E5%BD%95") {
                        layer.closeAll();
                        popwindows("login");
                        element.render('nav');
                    } else {
                        console.log("失败");
                    }
                }

            }
        });
    });

    function logout() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER");
        var user = document.getElementById("showname");
        user.innerHTML = "登陆";
    }
}

function popwindows(id) {
    // 弹窗
    layui.use('layer', function () { // 独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; // 独立版的layer无需执行这一句
        layer.closeAll();
        layer.open({
            type: 1
            , title: '登陆窗口'
            , area: ['500px', '400px']
            , offset: '100px'
            , id: 'btn' + id // 防止重复弹出
            , content: $('#signform')
            , success: login()
            , closeBtn: 2
            , resize: false// 拉伸
            , shade: [0.8, '#393D49']// 遮罩
            , shadeClose: true, // 点击遮罩关闭层
        });
    });
}

// 登陆函数
function login() {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        $('#login').click(
            function () {
                var username = $.trim($("#user")
                    .val());// 获取用户名
                var password = $.trim($("#pwd")
                    .val());
                // var url = user_login_url;
                var url = 'http://test.sunxiaoyuan.com:8080/oauth/token?client_id=house&client_secret=house&grant_type=password'
                var param = {
                    "username": username,
                    "password": password
                };
                $.ajax({
                    async: true,
                    url: url,
                    headers: {
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8;application/json; charset=utf-8"
                    },
                    type: 'GET',// method请求方式，get或者post
                    dataType: 'json',// 预期服务器返回的数据类型
                    data: param,// 表格数据序列化
                    // contentType:
                    // "application/json;
                    // charset=utf-8",
                    success: function (res) {
                        console.log(res);
                        success(res);
                    },// res为相应体,function为回调函数
                    error: error
                });
            });
    });
}

// 延迟加载区
function loadScript() {
    nva();
    try {
        var swap = LocalStorage_Day.get("USER").username;
    } catch (err) {
        // popwindows();
    }
    var username = {
        'username': swap
    };
    setname(username);
}

function success(res) {
    if (res != null) {
        updateUsername(res);
    }
    down();
    // console.log(JSON.stringify(data));
}

// 更新姓名
function updateUsername(res) {
    layui.use('jquery', function () {
        debugger;
        var $ = layui.jquery;
        var btnname = $('#btn');
        var name = btnname.text().trim();
        var username = null;
        token.set(res);
        // var swapToken = "Bearer" + "\xa0" + res.access_token;
        // var tokenhear = {"Authorization": swapToken};
        var tokenheaders = {
            'access_token': res.access_token
        };
        $.ajax({
            async: false,
            url: 'http://test.sunxiaoyuan.com:8080/user/info'
            // , url: '/test'
            ,
            type: 'GET'// method请求方式，get或者post
            // , headers: {"Authorization": swapToken}
            ,
            data: tokenheaders,
            success: function (userdata) {
                if (userdata.code === 200) {
                    LocalStorage_Day.set("USER", userdata.data[0], 0.1);
                    username = userdata.data[0].username;
                }
            },
            error: function (res) {
                console.log("登陆失败")
            }
            // , beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Authorization", swapToken);
            // }
        });
        if (name !== username && username != null) {
            var userdata = {
                'username': username
            };
            setname(userdata);
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
    });
}

// 设置姓名
function setname(userdata) {
    layui.use('laytpl', function () {
        var laytpl = layui.laytpl;
        laytpl.config({
            open: '{{',
            close: '}}'
        });
        var getTpl = usermodel.innerHTML;
        var view = document.getElementById('showname');
        laytpl(getTpl).render(userdata, function (html) {
            view.innerHTML = html;
        });
    });
}

// 关闭窗口
function down() {
    layui.use(['layer', 'jquery'], function () {
        var layer = layui.layer;
        var $ = layui.jquery;
        layer.close(layer.index);
        // 关闭窗口后，添加下拉效果
        var parent = $('#showname').parentsUntil("ul").find("dl:first");
        parent.addClass("layui-nav-child");
    });
}

function error(data) {
    console.log(JSON.stringify(data));
    console.log('操作失败！!');
}

// 延迟加载
if (window.addEventListener) {
    window.addEventListener("load", loadScript, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", loadScript);
} else {
    window.onload = loadScript;
}
