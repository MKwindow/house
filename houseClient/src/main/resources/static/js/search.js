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
        var param = data.field;
        type_d = param.housestyle % 10,
            type_c = parseInt(param.housestyle / 10 % 10),
            type_b = parseInt(param.housestyle / 100 % 10),
            type_a = parseInt(param.housestyle / 1000 % 10),
            pay_a = param.payway;
        var token = get_token();
        var swapdata = {
            "addr_id": param.areas,
            "style": param.style,
            "type_a": type_a,
            "type_b": type_b,
            "type_c": type_c,
            "type_d": type_d,
            "pay_a": pay_a,
            "rent": param.price_max,
            "access_token": token.access_token
        };
        $.ajax(
            {
                url: "http://localhost:8080/house/list",
                type: 'get',//method请求方式，get或者post
                dataType: 'json',//预期服务器返回的数据类型
                data: swapdata,//表格数据序列化
                // contentType: "application/json; charset=utf-8",
                success: function (res) {//res为相应体,function为回调函数
                    var resdata = Adapter_page(res);
                    updata_data(resdata);
                    // console.log(JSON.stringify(res));
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

function get_house(obj, event) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let houseid = $(obj).find("input:hidden:first").val().trim();
        localStorage.setItem("houseid", houseid);
        window.location.href = '/index/show_detail';
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

function clear_search() {
    let addr = document.getElementById('clear_address');
    addr.click(function () {
        localStorage.removeItem("search_address");
    });
}

//分页
layui.use(['laypage', 'layer', 'jquery'], function () {
    var laypage = layui.laypage
        , layer = layui.layer,
        $ = layui.jquery;
    var counts = null;
    let seach;
    try {
        seach = JSON.parse(localStorage.getItem("search_address")).address;
    } catch (err) {
        seach = '';
    }
    debugger;
    let where;
    if (seach != "") {
        where = {"pageNum": "1", "pageSize": "10", 'addr_detail': seach, 'status': 1,'pay_b':0};
    } else {
        where = {"pageNum": "1", "pageSize": "10",'status':1,'pay_b':0};
    }
    let url = "http://localhost:8080/house/list";
    use_ajax(url, where, function (res) {
        counts = res.data[0].total;
        let swap = Adapter_page(res);
        updata_data(swap);
        laypage.render({
            elem: 'field'
            , count: counts
            , limit: 10
            , first: false
            , last: false
            , groups: 8
            // , curr: location.hash.replace('#!fenye=', '')
            // , hash: 'fenye' //自定义hash值
            , jump: function (obj, first) {
                if (!first) {
                    get_page_search(obj, seach);
                }
            }
        })
    });
});

//请求
function get_page_search(obj, seach) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let page;
        if (seach != "") {
            page = {"pageNum": obj.curr, "pageSize": obj.limit, "addr_detail": seach,'pay_b':0};
        } else {
            page = {"pageNum": obj.curr, "pageSize": obj.limit,'pay_b':0};
        }
        let url = "http://localhost:8080/house/list";
        use_ajax(url, page, function (res) {
            var swap = Adapter_page(res);
            updata_data(swap);
        });
    });
}

function updata_data(data) {
    // console.log(data);
    var search = LocalStorage_Day.get("SEARCH");
    if (search != null) {
        for (var newkey in search.housestyle) {
            for (var key in data.list) {
                // console.log(data.data[key].housestyle);
                // console.log(newkey);
                if (data.list[key].housestyle == newkey) {
                    data.list[key].housestyle = search.housestyle[newkey];
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

function Adapter_page(res) {
    var parm = res.data;
    var list = [];
    for (var i = 0, len = parm[0].list.length; i < len; i++) {
        var housestyle = parm[0].list[i].type_a * 1000 + parm[0].list[i].type_b * 100 + parm[0].list[i].type_c * 10 + parm[0].list[i].type_d;
        var image = null;
        try {
            image = parm[0].list[i].pics[0].url
        } catch (err) {
            image = "/images/temp/property_01.jpg";
        }
        list[i] = {
            "houseimage": image,
            "housename": parm[0].list[i].title,
            "zent": parm[0].list[i].rent,
            "houseid": parm[0].list[i].id,
            "houseaddress": parm[0].list[i].addr_detail,
            "housestyle": housestyle,
            "housearea": parm[0].list[i].area
        };
    }
    return {"list": list};
}

