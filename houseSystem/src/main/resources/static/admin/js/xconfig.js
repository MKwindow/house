layui.config({
    version: false,
    debug: true,
    base: '/resources/static/admin/js/extends/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    login: 'xajax' //如果 mymod.js 是在根目录，也可以不用设定别名
});
