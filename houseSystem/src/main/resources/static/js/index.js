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
