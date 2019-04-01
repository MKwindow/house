//缓存一下
get_search_json();
//搜索
layui.use(['form', "jquery"], function () {
    var form = layui.form;
    var $ = layui.$;
    var search_data = null;
    if (get_search_json() != null) {
        search_data = get_search_json();
    } else {
        search_data = LocalStorage_Day.get("SEARCH");
    }
    // debugger
    // console.log(search_data.areas);
    // localStorage.removeItem("SEARCH");
    //加载模板
    var mode1 = document.getElementById("view_areas");
    search_template(areastpl, mode1, search_data, form);
    var mode2 = document.getElementById("view_housestyle");
    search_template(housestyletpl, mode2, search_data, form);
    var mode3 = document.getElementById("view_style");
    search_template(styletpl, mode3, search_data, form);
    var mode4 = document.getElementById("view_payway");
    search_template(paywaytpl, mode4, search_data, form);
    // 复选框
    form.on('checkbox(areas)', function (data) {
        var title = data.elem.title,
            elem = data.elem,
            value = data.value,
            ischecked = data.elem.checked;
        notfirst = $("#areas").find("input:gt(0)");
        var frist = $("#areas").find("input:first");
        if ((title == "全部" && data.elem.checked) ? true : false) {
            notfirst.removeClass("layui-form-checked");
            notfirst.attr("checked", false);
            form.render('checkbox');
        } else {
            frist.removeClass("layui-form-checked");
            frist.attr("checked", false);
            form.render('checkbox');
        }
        // console.log(data.elem); //得到checkbox原始DOM对象
        // console.log(data.elem.checked); //是否被选中，true或者false
        // console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        // console.log(data.othis); //得到美化后的DOM对象
    });
    form.on('submit(*)', function (data) {
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        //获取checkbox[name='areas']的值
        var arr = new Array();
        $("input:checkbox[name='areas']:checked").each(function (i) {
            arr[i] = $(this).val();
        });
        data.field.areas = arr.join(",");//将数组合并成字符串
        console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
        var param = JSON.stringify(data.field);
        $.ajax(
            {
                url: "/add",
                type: 'post',//method请求方式，get或者post
                dataType: 'json',//预期服务器返回的数据类型
                data: param,//表格数据序列化
                contentType: "application/json; charset=utf-8",
                success: function (res) {//res为相应体,function为回调函数
                    // if (res.status == 200) {
                    //     console.log('添加客户信息成功' + JSON.stringify(res));
                    //     var jsonURL = "/add";
                    //     $.getJSON(jsonURL, function (data) {
                    //         console.log(JSON.stringify(data));
                    //         console.log(JSON.stringify(res));
                    //     });
                    //     //$("#res").click();//调用重置按钮将表单数据清空
                    // } else {
                    //     console.log(param);
                    // }
                    console.log(JSON.stringify(res));
                },
                error: function () {
                    console.log('操作失败！!');
                }
            }
        );
        // console.log(param);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.render();
});

//搜索属性模板方法
// parm:
//     demo: 模板名字ID
//     view: 渲染视图ID
//     data: 渲染视图数据
function search_template(tpl, view, search_data, form) {
    layui.use('laytpl', function () {
        var laytpl = layui.laytpl;
        laytpl.config({
            open: '<%',
            close: '%>'
        });
        // debugger
        var getTpl = tpl.innerHTML;
        laytpl(getTpl).render(search_data, function (html) {
            view.innerHTML = html;
            form.render();
        });
    });
}


//范围
layui.use('slider', function () {
    var zent_data = {
        "min": 0,
        "max": 8000
    };
    var $ = layui.$
        , slider = layui.slider;
    var min = $("#show-slider-tips").find("input[name='price_min']");
    var max = $("#show-slider-tips").find("input[name='price_max']");
    min.attr("value", zent_data.min);
    max.attr("value", zent_data.max);
    //开启范围选择
    slider.render({
        elem: '#slide'
        , value: [zent_data.min, zent_data.max] //初始值
        , range: true //范围选择
        , min: zent_data.min
        , max: zent_data.max
        , tips: true
        , change: function (vals) {
            min.attr("value", vals[0]);
            max.attr("value", vals[1]);
        }
    });
});
//分页
layui.use(['laypage', 'layer', 'jquery'], function () {
    var laypage = layui.laypage
        , layer = layui.layer;
    laypage.render({
        elem: 'field'
        , count: 100
        , limit: 6
        , first: false
        , last: false
        // , curr: location.hash.replace('#!fenye=', '')
        // , hash: 'fenye' //自定义hash值
        , jump: function (obj, first) {
            get_page_search(obj, first);
        }
    });
});

//请求
function get_page_search(obj, first) {
    layui.use('jquery', function () {
        var $ = layui.jquery,
            // where = {"token": "asf"},
            page = {"curr": obj.curr, "limit": obj.limit};
        // var data = $.extend(where, page);
        var data = page;
        var url = "/json/search_data_main.json";
        // console.log(1);
        $.ajax({
            url: url
            , type: 'GET'
            , dataType: 'json'//预期服务器返回的数据类型
            , contentType: "application/json; charset=utf-8"
            , data: data
            , success: function (res) {
                // console.log(JSON.stringify(res));
                updata_data(res);
            }, error: function (res) {
                console.log("访问失败:######/t" + JSON.stringify(res));
            }, beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOD.....");
            }
        });
    });
}

function updata_data(data) {
    // console.log(data);
    var search = LocalStorage_Day.get("SEARCH");
    if (search != null) {
        for (var newkey in search.housestyle) {
            for (var key in data.data) {
                // console.log(data.data[key].housestyle);
                // console.log(newkey);
                if (data.data[key].housestyle == newkey) {
                    data.data[key].housestyle = search.housestyle[newkey];
                }
            }
        }
    }
    var view = document.getElementById('seach_data_main');
    layui.use('laytpl', function () {
        var laytpl = layui.laytpl;
        laytpl.config({
            open: '<%',
            close: '%>'
        });
        var getTpl = seach_nav_item.innerHTML;
        laytpl(getTpl).render(data, function (html) {
            view.innerHTML = html;
        });
    });
}