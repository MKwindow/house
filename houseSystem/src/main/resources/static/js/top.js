var USERNAME_SWAP = null;

function nva() {
    //导航条
    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        // element.on('nav(demo)', function (elem) {
        //     console.log('导航条:' + elem.text());
        //     // layer.msg(elem.text());
        // });
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
            USERNAME_SWAP = username;
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
                    success: success,//res为相应体,function为回调函数
                    error: error
                }
            );
        });
    });
}

//延迟加载区
function loadScript() {
    var swap = localStorage.getItem("username");
    var username = {'username': swap};
    setname(username);
    nva();
    if (swap === null || swap == "登陆" || swap == "") {
        popwindows();
    }
}

//延迟加载
if (window.addEventListener) {
    window.addEventListener("load", loadScript, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", loadScript);
} else {
    window.onload = loadScript;
}

function down() {
    layui.use(['layer', 'jquery'], function () {
        var layer = layui.layer;
        var $ = layui.jquery;
        layer.close(layer.index);
    })
}

function success(data) {
    if (data != null) {
        console.log("用户等于空",USERNAME_SWAP);
        if (USERNAME_SWAP != null) {
            console.log("用户不等于空",USERNAME_SWAP);
            localStorage.setItem("username", USERNAME_SWAP);
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
        var username = localStorage.getItem('username');
        localStorage.setItem("token", data);
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
        var getTpl = usermodel.innerHTML
        var view = document.getElementById('showname');
        laytpl(getTpl).render(userdata, function (html) {
            view.innerHTML = html;
        });
    });
}

function error() {
    console.log('操作失败！!');
}

function logout() {
    localStorage.clear();
    window.location.reload();
}

