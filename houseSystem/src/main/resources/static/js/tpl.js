//使用ajax
function use_ajax(url, parm, success) {
    // console.log(parm);
    // JSON.stringify();
    // debugger;
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var token = get_token();
        try {
            parm = Object.assign(parm, {"access_token": token.access_token});
        } catch (err) {
//            error_token();
        }
        // console.log(token.access_token);
        var value = "bearer" + '\xa0' + token.access_token;
        var statusCode = $.ajax({
            url: url
            , type: 'GET'
            , data: parm
            , headers: {
                "Authorization": value
            }
            , dataType: 'json'//预期服务器返回的数据类型
            // , contentType: "application/json; charset=utf-8"
            , success: success
            , error: function (data, start, xhr) {
                localStorage.removeItem("TOKEN");
                localStorage.removeItem("USERNAME");
                error_token();
                console.log("访问失败");
            }
            // }, beforeSend: function (XMLHttpRequest) {
            //     XMLHttpRequest.setRequestHeader("Authorization", "bearer " + token.access_token);
            // }
        });
        // console.log(statusCode);
    });
}

//设置搜索属性
function get_search_json() {
    var search_data = LocalStorage_Day.get("SEARCH");
    if (search_data === null || search_data === "") {
        layui.use("jquery", function () {
            var $ = layui.jquery;
            // var url = "http://localhost:63342/resources/static/json/search.json";
            var url = "/json/search.json";
            $.getJSON(url, function (res) {
                if (res.code === 0) {
                    // debugger
                    LocalStorage_Day.set("SEARCH", res.data, 0.1);
                    // console.log("search_data" + res.data);
                    search_data = res.data;
                }
            });
        });
    }
    return search_data;
}

function get_token() {
    var data = JSON.parse(localStorage.getItem("TOKEN"));
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

function error_token() {
    var userform = document.getElementById("signform");
    if (userform != null) {
        var user = document.getElementById("showname");
        user.innerHTML = "登陆";
        popwindows("error_token");
    }else{
    	 window.location.href = '/index';
    }
   
}

