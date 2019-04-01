function nva() {
    //导航条
    layui.use(['element', 'jquery'], function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        var $ = layui.jquery;
        var username = LocalStorage_Day.get("USERNAME");
        var parent = $('#showname').parentsUntil("ul").find("dl:first");
        if (username === "" || username === null) {
            // parent.removeClass("layui-nav-child");//设置为展开之前的css，即不展开的样式
        }
        //监听导航点击
        element.on('nav(loginfilter)', function (elem) {
        });
    });
}

function popwindows() {
    //弹窗
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        var active = {
            offset: function (othis) {
                var type = othis.data('type')
                    , text = othis.text();
                layer.open({
                    type: 1
                    , title: '登陆窗口'
                    , area: ['500px', '400px']
                    , offset: '100px'
                    , id: 'btn' + type //防止重复弹出
                    , content: $('#signform')
                    , success: login
                    , closeBtn: 2
                    , resize: false//拉伸
                    , shade: [0.8, '#393D49']//遮罩
                });
            }
        };
        $('#btn.layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });
}

//登陆函数
function login() {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        $('#login').click(function () {
            var username = $.trim($("#user").val());//获取用户名
            var password = $.trim($("#pwd").val());
            // var url = user_login_url;
            var url = 'http://test.sunxiaoyuan.com:8080/oauth/token?client_id=house&client_secret=house&grant_type=password'
            var param = {"username": username, "password": password};
            $.ajax(
                {
                    async: true,
                    url: url,
                    headers: {
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8;application/json; charset=utf-8"
                    },
                    type: 'GET',//method请求方式，get或者post
                    dataType: 'json',//预期服务器返回的数据类型
                    data: param,//表格数据序列化
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        success(res, username);
                    },//res为相应体,function为回调函数
                    error: error
                }
            );
        });
    });
}

//延迟加载区
function loadScript() {
    try {
        var swap = LocalStorage_Day.get("USERNAME");
    } catch (err) {
        console.log("Uncaught ReferenceError: LocalStorage is null");
    }
    // console.log(swap);
    var username = {'username': swap};
    nva();
    if (swap === null || swap == "登陆" || swap == "") {
        popwindows();
    }
    setname(username);
}


function success(data, username) {
    if (data != null) {
        if (username != null) {
            LocalStorage_Day.set("USERNAME", username, 1);
        }
        updateUsername(data.data);
        down();
    }
    // console.log(JSON.stringify(data));
}

//更新姓名
function updateUsername(data) {
    layui.use('jquery', function () {
        // console.log('进入更新');
        var $ = layui.jquery;
        var laytpl = layui.laytpl;
        var btnname = $('#btn');
        var name = btnname.text().trim();
        var username = LocalStorage_Day.get('USERNAME');
        token.set("TOKEN", data);
        if (name !== username) {
            var userdata = {'username': username};
            setname(userdata);
        }
    });
}

//设置姓名
function setname(userdata) {
    layui.use('laytpl', function () {
        var laytpl = layui.laytpl;
        laytpl.config({
            open: '{{',
            close: '}}'
        });
        var getTpl = usermodel.innerHTML
        var view = document.getElementById('showname');
        laytpl(getTpl).render(userdata, function (html) {
            view.innerHTML = html;
        });
    });
}

//关闭窗口
function down() {
    layui.use(['layer', 'jquery'], function () {
        var layer = layui.layer;
        var $ = layui.jquery;
        layer.close(layer.index);
        //关闭窗口后，添加下拉效果
        var parent = $('#showname').parentsUntil("ul").find("dl:first");
        parent.addClass("layui-nav-child");
    });
}


function error() {
    console.log('操作失败！!');
}

function logout() {
    sessionStorage.removeItem("USERNAME_SWAP");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USERNAME");
    window.location.reload();
}

//延迟加载
if (window.addEventListener) {
    window.addEventListener("load", loadScript, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", loadScript);
} else {
    window.onload = loadScript;
}