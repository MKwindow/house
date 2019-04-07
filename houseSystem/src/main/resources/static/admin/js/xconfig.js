layui.config({
    version: false,
    debug: true,
    base: '/admin/js/extends/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    xajax: 'xajax', //ajax 封装
    ifrmsg: 'ifrmsg' //inframe 消息封装
});
