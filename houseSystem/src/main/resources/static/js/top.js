//导航条
function loadScript() {
    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        //监听导航点击
        element.on('nav(demo)', function (elem) {
            //console.log(elem)
            layer.msg(elem.text());
        });
    });
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
                    , success: function () {
                        login();
                    }
                    , closeBtn: 2
                    , resize: false//拉伸
                    , shade: [0.8, '#393D49']//遮罩
                });
            }
        }
        $('#btn.layui-btn').on('click', function () {
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });

    function login() {
        var bol = false;
        layui.use('jquery', function () {
            var $ = layui.jquery;
            $('#login').click(function () {
                var username = $.trim($("#user").val());//获取用户名
                var password = $.trim($("#pwd").val());
                var url = '/login';
                var param = {"username": username, "password": password};
                $.ajax(
                    {
                        url: url,
                        type: 'post',//method请求方式，get或者post
                        dataType: 'json',//预期服务器返回的数据类型
                        data: JSON.stringify(param),//表格数据序列化
                        contentType: "application/json; charset=utf-8",
                        success: success,//res为相应体,function为回调函数
                        error: error
                    }
                );
            });
        });
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
    window.parent.location.reload();
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function success(data) {
    console.log(data)
    down();
}

function error() {
    console.log('操作失败！!');
}