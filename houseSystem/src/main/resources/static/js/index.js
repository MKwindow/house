layui.use('element', function() {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    //监听导航点击
    element.on('nav(demo)', function(elem) {
        //console.log(elem)
        layer.msg(elem.text());
    });
});
layui.use([ 'carousel', 'form' ], function() {
    var carousel = layui.carousel, form = layui.form;
    carousel.render({
        elem : '#test',
        width : '1000' //设置容器宽度
        ,
        height : '400' //设置容器高度
        ,
        arrow : 'hover' //始终显示箭头
        ,
        anim : 'default' //切换动画方式
        ,
        interval : '3000',//自动切换的时间间隔
        indicator : 'inside',//指示器位置
        autoplay : false //是否自动切换
    });
});