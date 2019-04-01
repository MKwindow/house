//使用ajax
function use_ajax(url, parm, success) {
    var token = LocalStorage_Day.get("TOKEN");
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
