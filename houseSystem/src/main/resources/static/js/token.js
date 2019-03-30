//访问失败后登陆token
function error_token() {
    var token = localStorage.getItem("token");//获取名称为“key”的值
    if (token == null || token === "") {
        var userform = document.getElementById("signform");
        if (userform != null) {
            popwindows();
        }
        window.location.href = '/index';
    }
}

//使用ajax
function use_ajax(url, parm, success) {
    var token = localStorage.getItem("token");
    // (parm === "" || parm === null) ? (parm = token) : (Object.assign(parm, token.accesstoken));
    // console.log(parm);
    // JSON.stringify();
    layui.use('jquery', function () {
        var $ = layui.jquery;
        $.ajax({
            url: url
            , type: 'GET'
            , data: parm
            , dataType: 'json'//预期服务器返回的数据类型
            , contentType: "application/json; charset=utf-8"
            , success: success
            , error: function (data) {
                if (data.code === 401) {
                    error_token();
                }
                console.log("访问失败");
            }
        });
    });
}
