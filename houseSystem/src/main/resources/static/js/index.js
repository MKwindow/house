//轮播

layui.use('carousel', function () {
    var carousel = layui.carousel;
    var opt = {
        elem: '#index_carousel'
        , width: '1000' //设置容器宽度
        , height: '400' //设置容器高度
        , arrow: 'hover' //始终显示箭头
        , anim: 'default' //切换动画方式
        , interval: '3000'//自动切换的时间间隔
        , indicator: 'inside'//指示器位置
        , autoplay: false //是否自动切换
    };

    var ins = carousel.render(opt);
    carouse(ins, opt);
});


//搜索特效
function searchToggle(obj, evt) {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var container = $(obj).closest('.search-wrapper');
        if (!container.hasClass('active')) {
            container.addClass('active');
            evt.preventDefault();
        }
        else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            // clear and hide result container when we press close
            container.find('.result-container').fadeOut(100, function () {
                $(this).empty();
            });
        }
    });

}

//搜索点击事件
function submitFn(obj, evt) {
    layui.use('jquery', function () {
        var $ = layui.jquery;

        value = $(obj).find('.search-input').val().trim();
        var url = "/index/search";
        var parm;
        if (!value.length) {
            parm = {"address": ""};
        }
        else {
            parm = {"address": value};
        }
        // console.log(url + JSON.stringify(parm));
        $.ajax({
            url: url
            , type: 'post'
            , data: JSON.stringify(parm)
            , dataType: 'json'//预期服务器返回的数据类型
            , contentType: "application/json; charset=utf-8"
            , success: go
        });
        $(obj).find('.result-container').fadeIn(100);
        evt.preventDefault();
    });
}

//跳转到路径
function go(data) {
    // console.log(data);
    if (data.code == 200) {
        window.location.href = data.data.url;
    }
}

//轮转函数
function carouse(ins, opt) {
    var carousel_data = null;
    var url = houser_carousel_url;
    var data = "";
    //获取轮转数据
    use_ajax(url, data, function (data) {
        if (data.code === 0) {
            carousel_data = {"list": data.data};
            update_carousel(carousel_data);
        }
    });

    function update_carousel(carousel_data) {
        layplmode(shuffling_template, 'show_index_carousel_template', carousel_data, ins, opt);
    }
}

//分页请求
layui.use(['laypage', 'layer'], function () {
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
            var curr = obj.curr,
                limit = obj.limit;
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            var data = {"curr": curr, 'limit': limit};
            get_page(data);
            //首次不执行
            if (!first) {
                // console.log(1);
            }
        }
    });
});

//分页数据操作
function get_page(data) {
    var url = houser_index_page_url;
    use_ajax(url, data, function (data) {
        if (data.code === 0) {
            var page_data = {"list": data.data};
            update_page(page_data);
        }
    });

    function update_page(page_data) {
        var result1 = [];
        var result2 = [];
        var i = 0;
        layui.each(page_data.list, function (index, item) {
            if (index <= 2) {
                result1[index] = item;
            } else {
                result2[index % 3] = item;
            }
        });
        var list1 = {
            "list": result1
        };
        var list2 = {
            "list": result2
        };
        layplmode(card_template, 'show_index_main_template1', list1);
        layplmode(card_template, 'show_index_main_template2', list2);
    }
}

//parm jS模型模板ID 渲染视图ID  渲染数据
function layplmode(modename, viewname, data, ins, opt) {
    layui.use(['laytpl', 'jquery', 'carousel'], function () {
        // laytpl.config({
        //     open: '<{%',
        //     close: '%}>'
        // });
        var laytpl = layui.laytpl,
            $ = layui.jquery,
            carousel = layui.carousel;
        var getTp_page = modename.innerHTML
            , view = document.getElementById(viewname);
        laytpl(getTp_page).render(data, function (html) {
            view.innerHTML = html;
            var msg = null;
            try {
                if ($.isFunction) {
                    ins.reload(opt);
                } else {
                    msg = "刷新轮播异常"
                }
            } catch (err) {
                if (msg != null)
                    console.log(msg);
            }
        });
    });
}

//详情页
function get_house(obj, event) {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var houseid = $(obj).find("input:hidden:first").val().trim();
        var parm = {"houseid": houseid}
        var url = "/index/detail"
        $.ajax({
            url: url
            , type: 'post'
            , dataType: 'json'//预期服务器返回的数据类型
            , contentType: "application/json; charset=utf-8"
            , data: JSON.stringify(parm)
            , success: function (data) {
                if (data.code === 200) {
                    window.location.href = data.data.url;
                }
            }
            , error: function () {
                console.log("访问失败");
            }
        });
    });
}
