// 过期策略：localstorage永久存储，不过期，除非手动删除，sessionstorage在重启浏览器、关闭页面或新开页面时失效。
// ①clear（）：删除所有值。
// ②getItem（name）：根据指定的名字name获取对应的值
// ③key(index)：在指定的数字位置获取该位置的名字。
// ④removeItem（name）：删除由name指定的名值对
// ⑤setItem(name,value)：为指定名字设置一个对应的值
// localStorage.setItem("name", "songyuhua");

layui.use('table', function () {
    var url1 = 'http://localhost:63342/resources/static/json/rent_manage.json';
    var url2 = 'http://localhost:8081/json/rent_manage.json';
    var table = layui.table;
    table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url2 //请求地址
        , method: 'get'//请求方法
        , contentType: 'application/json'//发送到服务端的内容编码类型
        , headers: {token: 'sasasas'}//请求头
        , where: {token: 'sasasas', id: 123}//接口的其它参数
        // 解析数据返回类型
        , parseData:
            function (res) { //res 即为原始返回的数据
                return {
                    "code": res.status, //解析接口状态
                    "msg": res.message, //解析提示文本
                    "count": res.total, //解析数据长度
                    "data": res.data.item //解析数据列表
                };
            }
        // 规定返回的数据类型
        , response: {
            statusName: 'status' //规定数据状态的字段名称，默认：code
            , statusCode: 200 //规定成功的状态码，默认：0
            , msgName: 'hint' //规定状态信息的字段名称，默认：msg
            , countName: 'total' //规定数据总数的字段名称，默认：count
            , dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        // 用于对分页请求的参数名称设定
        , request: {
            pageName: 'curr' //页码的参数名称，默认：page
            , limitName: 'nums' //每页数据量的参数名，默认：limit
        }
        //分页开关
        , page: true
        // 每页显示的条数（默认：10）名字优先级低于request
        , limit: 6
        //每页条数选项 默认：[10,20,30,40,50,60,70,80,90] 名字优先级低于request
        , limits: [30, 60, 90]
        //默认 true，即直接由 table 组件在前端自动处理排序。
        , autoSort: true
        //开启表格头部工具栏区域，该参数支持四种类型值：
        // , toolbar: '#toolbarDemo' //指向自定义工具栏模板选择器
        // , toolbar: '<div>xxx</div>' //直接传入工具栏模板字符
        // , toolbar: true //仅开启工具栏，不显示左侧模板
        // , toolbar: 'default' //让工具栏左侧显示默认的内置模板
        // 注意：
        // 1. 该参数为 layui 2.4.0 开始新增。
        // 2. 若需要“列显示隐藏”、“导出”、“打印”等功能，则必须开启该参数
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , defaultToolbar: ['filter', 'print', 'exports']//打印图标 自由配置头部工具栏右侧的图标  toolbar必须开启才会生效
        , width: 1000//设定容器宽度。table容器的默认宽度是跟随它的父元素铺满，你也可以设定一个固定值，当容器中的内容超出了该宽度时，会自动出现横向滚动条。
        //1.默认情况。高度随数据列表而适应，表格容器不会出现纵向滚动条
        //2.设定一个数字，用于定义容器高度，当容器中的内容超出了该高度时，会自动出现纵向滚动条
        //3.高度将始终铺满，无论浏览器尺寸如何。这是一个特定的语法格式，其中 full 是固定的，而 差值 则是一个数值，这需要你来预估，
        // 比如：表格容器距离浏览器顶部和底部的距离“和” PS：该功能为 layui 2.1.0 版本中新增 实例：height: 'full-20'
        , height: 1000
        , title: '房东房屋表格'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        //回调接口 //返回值
        , done: function(res, curr, count){
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            //得到当前页码
            console.log(curr);
            //得到数据总量
            console.log(count);
        }
        //表头定义
        , cols: [
            [
                {
                    //左侧多选框
                    type: 'checkbox',//多选框
                    fixed: 'left'//左侧
                }
                , {
                field: 'houseid',//属性名
                title: '房屋编号',//表头名字
                width: 100,//表头宽度 设定列宽，若不填写，则自动分配
                minWidth: 100, //局部定义当前常规单元格的最小宽度（默认：60），一般用于列宽自动分配的情况。其优先级高于基础参数中的 cellMinWidth
                LAY_CHECKED: true,//是否全选状态（默认：false）。必须复选框列开启后才有效，如果设置 true，则表示复选框默认全部选中。
                //固定列。可选值有：left（固定在左）、right（固定在右）。一旦设定，对应的列将会被固定在左或右，不随滚动条而滚动。
                //注意：如果是固定在左，该列必须放在表头最前面；如果是固定在右，该列必须放在表头最后面。
                fixed: 'left',
                unresize: true,//是否禁用拖拽列宽（默认：false）
                edit: 'text',//	单元格编辑类型（默认不开启）目前只支持：text（输入框）
                sort: true,//排序
                totalRowText: '合计:',//用于显示自定义的合计文本
                totalRow: true,//是否开启该列的自动合计功能
                // 是否允许排序（默认：false）。如果设置 true，则在对应的表头显示排序icon，从而对列开启排序功能。
                // 注意：不推荐对值同时存在“数字和普通字符”的列开启排序，因为会进入字典序比对。比如：'贤心' > '2' > '100'，
                // 这可能并不是你想要的结果，但字典序排列算法（ASCII码比对）就是如此
                sort: true,
                toolbar: '#bar',//绑定列工具条。设定后，可在每行列中出现一些自定义的操作性按钮 方法和定义模板相同
                //自定义列模板，模板遵循 laytpl 语法。这是一个非常实用的功能，你可借助它实现逻辑处理，以及将原始数据转化成其它格式，如时间戳转化为日期字符等
                //每竖的显示模板
                //方式一：绑定模版选择器。
                templet: '#titleTpl',
                //方式二：函数转义
                templet: function (d) {
                    return 'ID：' + d.id + '，标题：<span style="color: #c00;">' + d.title + '</span>'
                },
                //方式三：直接赋值模版字符 注意：这里一定要被一层 <div></div> 包裹，否则无法读取到模板
                templet: '<div><a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a></div>'
            },
                {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#bar',
                    width: 150
                }
            ]
        ]
    });

    //工具栏事件
    table.on('toolbar(hourse)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：' + data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                break;
        }
        ;
    });
    //监听行工具事件
    //给一竖添加操作时间 比如 操作列
    table.on('tool(hourse)', function (obj) {
            //数据 键值对形式
            var data = obj.data;
            console.log(obj);
            switch (obj.event) {
                case 'del':
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                        //向服务端发送删除指令
                    });
                    break;
                case  'edit' : {
                    //修改操作发送
                    layer.alert('编辑行：<br>' + JSON.stringify(data));
                    //更新缓存里面的值
                    obj.update({
                        username: '123'
                        , title: 'xxx'
                    });
                    break;
                }
            }
        }
    );
});