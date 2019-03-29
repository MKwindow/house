layui.use(['table', 'jquery'], function () {
    var table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    console.log(houser_static_url);
    var url = houser_static_url;
    var retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'get'//请求方法
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房屋预定管理'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        , cols: [
            [
                {type: 'checkbox', fixed: 'left'}
                , {
                field: 'reserveid',
                title: '预定编号',
                width: 100,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'housestyle', title: '房屋类型', width: 120}
                , {field: 'houseaddress', title: '房屋地址', width: 100}
                , {field: 'tenantname', title: '租客姓名', width: 100, sort: true}
                , {field: 'tenantphone', title: '租客电话', width: 100}
                , {field: 'username', title: '个人姓名', width: 100}
                , {field: 'zent', title: '租金', width: 80, sort: true}
                , {
                field: 'houseimage',
                title: '图片',
                width: 80,
                templet: '#img'
            }
                , {field: 'payway', title: '缴费方式', width: 100}
                , {field: 'housedate', title: '发布时间', width: 100, sort: true}
                , {field: 'reservestate', title: '出租状态', width: 110, sort: true, templet: '#checkboxTp1'}
                , {field: 'remakes', title: '认证状态', width: 100, sort: true}
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 200}
            ]
        ]
        , page: true //分页开关
        , loading: false
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
            case 'flush':
                retable.reload();
                break;
        }
    });
    //监听行工具事件
    //右侧
    table.on('tool(hourse)', function (obj) {
        var data = obj.data;
        // console.log(obj);
        switch (obj.event) {
            case 'del':
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    layer.close(index);
                });
                break;
            case 'edit':
                // layer.alert('编辑行：<br>' + JSON.stringify(data));
                layer.open({
                    type: 1
                    , shade: 0.8
                    , offset: 'auto'
                    , content: $('#formedit')
                    , area: ['600px', '600px']
                    , shadeClose: true//点击外围关闭弹窗
                    , title: "编辑内容" //不显示标题
                });
                form.val("formedit", {
                    "houseid": data.houseid // "name": "value"
                    , 'housename': data.housename
                    , 'area': data.area
                    , "housestyle": data.housestyle
                    , "houseaddress": data.houseaddress
                    , "housearea": data.housearea
                    , "housefaci": data.housefaci
                    , "zent": data.zent
                    , "style": data.style
                    , "payway": data.payway
                    , "housedate": data.style
                });
                //表单提交
                form.on('submit(up)', function (data) {
                    console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                    console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                    console.log(JSON.stringify(data.field)); //当前容器的全部表单字段，名值对形式：{name: value}
                    $.ajax({
                            url: '/test'

                        }
                    );
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
                //更新缓存里面的值
                obj.update({
                    "houseid": data.houseid // "name": "value"
                    , 'housename': data.housename
                    , 'area': data.area
                    , "housestyle": data.housestyle
                    , "houseaddress": data.houseaddress
                    , "housearea": data.housearea
                    , "housefaci": data.housefaci
                    , "zent": data.zent
                    , "style": data.style
                    , "payway": data.payway
                    , "housedate": data.housedate
                });
                break;
            case 'attestation':
                layer.open({
                    type: 1,
                    shade: 0.8,
                    offset: 'auto',
                    area: [250 + 'px', 200 + 'px'],
                    shadeClose: true,//点击外围关闭弹窗
                    scrollbar: false,//不现实滚动条
                    title: "文件上传", //不显示标题
                    content: $('#file'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                });
                uploadData(data);
                break;
        }
    });

    //监听出租状态锁定操作
    form.on('checkbox(lockcity)', function (obj) {
        layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });
    //监听认证状态锁定操作
    // form.on('checkbox(lockattestation)', function (obj) {
    //     layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    // });

});

//上传
function uploadData(data) {
    layui.use('upload', function () {
        var upload = layui.upload;
        var $ = layui.jquery;
        upload.render({
            elem: '#file', //绑定元素
            url: '/file/' //上传接口
            , method: 'post'//默认post
            , accept: 'file'//文件类型
            , size: 51200//大小
            , exts: 'zip|rar|7z|doc|txt|docx|rtf|pdf|gz|arj'//允许后缀
            , auto: true//自动上传
            // , bindAction: '#up'//提交按钮 不使用默认提交方式
            , done: function (res) {
                console.log('上传完毕回调');
                //上传完毕回调
            }
            , error: function () {
                console.log('请求异常回调');
                //请求异常回调
            }

        });
        console.log(data);
    });
}

function uploadimg(rowdata) {
    //上传图片
    layui.use('upload', function () {
        var upload = layui.upload;
        var $ = layui.jquery;
        upload.render({
            elem: '#image', //绑定元素
            url: '/imgage/' //上传接口
            , method: 'post'//默认post
            , accept: 'images'//文件类型
            , data: {
                houseid: rowdata.houseid//额外属性
            }
            // , headers: {token: 'sasasas'}//头部属性
            , size: 20480//大小
            , auto: true//自动上传
            , done: function (res) {
                console.log('上传完毕回调');
                //上传完毕回调
            }
            , error: function () {
                console.log('请求异常回调');
                //请求异常回调
            }
        });
    });
}

//图片弹出窗
function previewImg(obj) {
    var img = new Image();
    img.src = obj.src;
    var height = img.height + 50; //获取图片高度
    var width = img.width; //获取图片宽度
    var imgHtml = "<img src='" + obj.src + "' width='500px' height='500px'/>";
    //弹出层
    layer.open({
        type: 1,
        shade: 0.8,
        offset: 'auto',
        area: [500 + 'px', 550 + 'px'],
        shadeClose: true,//点击外围关闭弹窗
        scrollbar: false,//不现实滚动条
        title: "图片预览", //不显示标题
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            // layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
}