//轮播
layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel, form = layui.form;
    carousel.render({
        elem: '#index_carousel',
        width: '1000' //设置容器宽度
        ,
        height: '400' //设置容器高度
        ,
        arrow: 'hover' //始终显示箭头
        ,
        anim: 'default' //切换动画方式
        ,
        interval: '3000',//自动切换的时间间隔
        indicator: 'inside',//指示器位置
        autoplay: false //是否自动切换
    });
});
//分页
layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage
        , layer = layui.layer;
    laypage.render({
        elem: 'field'
        , count: 100
        , limit: 6
        , first: false
        , last: false
        , curr: location.hash.replace('#!fenye=', '')
        , hash: 'fenye' //自定义hash值
    });
});

//搜索特效
function searchToggle(obj, evt) {
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
}

function submitFn(obj, evt) {
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
}

function go(data) {
    // console.log(data);
    if (data.code == 200) {
        window.location.href = data.data.url;
    }
}

layui.use('laytpl', function () {
    var laytpl = layui.laytpl;
    // laytpl.config({
    //     open: '<{%',
    //     close: '%}>'
    // });
    var carousel_data = { //数据
        "list": [
            {"images": "/images/temp/property_01.jpg", "housename": "华府大道", "zent": "1900", "houseid": "16416"}
            , {"images": "/images/temp/property_02.jpg", "housename": "华府大道12", "zent": "1200", "houseid": "16416"}
            , {"images": "/images/temp/property_03.jpg", "housename": "华府大道31", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_04.jpg", "housename": "华府大道5", "zent": "1700", "houseid": "16416"}
            , {"images": "/images/temp/property_05.jpg", "housename": "华府大道7", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_01.jpg", "housename": "华府大道9", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_02.jpg", "housename": "华府大道8", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_03.jpg", "housename": "华府大道5", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_04.jpg", "housename": "华府大道46", "zent": "1800", "houseid": "16416"}
            , {"images": "/images/temp/property_05.jpg", "housename": "华府大道97", "zent": "1800", "houseid": "16416"}
        ]
    };
    var page_data1 = { //数据
        "list": [
            {
                "images": "/images/temp1/property_01.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "1900",
                "style": "经济",
                "houseid": "16416"
            }
            , {
                "images": "/images/temp1/property_02.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "12410",
                "style": "经济",
                "houseid": "16416"
            }
            , {
                "images": "/images/temp1/property_03.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "1200",
                "style": "经济",
                "houseid": "16416"
            }
        ]
    };
    var page_data2 = { //数据
        "list": [
            {
                "images": "/images/temp1/property_01.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "1900",
                "style": "经济",
                "houseid": "16416"
            }
            , {
                "images": "/images/temp1/property_02.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "12410",
                "style": "经济",
                "houseid": "16416"
            }
            , {
                "images": "/images/temp1/property_03.jpg",
                "houseaddress": "柚米国际社区四川北路（上海市虹口区虹江路525号）",
                "zent": "1200",
                "style": "经济",
                "houseid": "16416"
            }
        ]
    };

    layplmode(shuffling_template, 'show_index_carousel_template', carousel_data);
    layplmode(card_template, 'show_index_main_template1', page_data1);
    layplmode(card_template, 'show_index_main_template2', page_data2);

    //parm jS模型模板ID 渲染视图ID  渲染数据
    function layplmode(modename, viewname, data) {
        var getTp_page = modename.innerHTML
            , view = document.getElementById(viewname);
        laytpl(getTp_page).render(data, function (html) {
            view.innerHTML = html;
        });
    }
});

function get_house(obj, event) {
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
        ,error:function () {
            console.log("访问失败");
        }
    });
}

