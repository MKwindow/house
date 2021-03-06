//轮播
layui.use(['carousel', 'form'], function () {
    var carousel = layui.carousel, form = layui.form;
    carousel.render({
        elem: '#test',
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
