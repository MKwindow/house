layui.use(['table', 'jquery'], function () {
    var table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    var url = "/json/order_owner_manage.json";
    var retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'get'//请求方法
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房东房屋表格'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        , cols: [
            [
                {type: 'checkbox', fixed: 'left'}
                , {
                field: 'contractid',
                title: '合同编号',
                width: 100,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'ownername', title: '房东姓名', width: 80}
                , {
                field: 'owneridentity',
                title: '房东身份证',
                width: 140,
                templet: '#idcard'
            }
                , {field: 'houseid', title: '房屋id', width: 100,sort:true}
                , {field: 'tenantname', title: '租客名字', width: 100, sort: true}
                , {field: 'tenantphone', title: '租客电话', width: 120}
                , {field: 'renpayable', title: '应交租金', width: 90,sort:true}
                , {field: 'startdate', title: '签订时间', width: 100, sort: true}
                , {field: 'enddata', title: '到期时间', width: 100, sort: true}
                , {
                title: '房屋详情',
                width: 90,
                templet: '#houser'
            }
                , {field: 'text', title: '合同内容', width: 100}
                , {field: 'attestation', title: '认证状态', width: 100, sort: true, templet: '#checkboxTp2'}
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 240}
            ]
        ]
        , page: true //分页开关
        , loading: false
    });

    //工具栏事件
    table.on('toolbar(order)', function (obj) {
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
    table.on('tool(order)', function (obj) {
        var data = obj.data;
        // console.log(obj);
        switch (obj.event) {
            case 'orderSigned':

                break;
            case 'upOrder':
                layer.open({
                    type: 1,
                    shade: 0.8,
                    offset: 'auto',
                    area: [250 + 'px', 200 + 'px'],
                    shadeClose: true,//点击外围关闭弹窗
                    scrollbar: false,//不现实滚动条
                    title: "文件上传", //不显示标题
                    content: $('#file') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                });
                uploadData(data);
                break;
        }
    });
});

//上传
function uploadData(data) {
    layui.use('upload', function () {
        var upload = layui.upload;
        var $ = layui.jquery;
        var id = data.houseid;
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

function show_house(obj, event) {
    layui.use('jquery', function () {
        var $ = layui.jquery;
        var id = $(obj).siblings("input[type='hidden']").val().trim();
        var url = "/index/detail";
        var data = {"houseid": id};
        $.ajax({
            url: url
            , type: 'POST'
            , data: JSON.stringify(data)
            , dataType: 'json'//预期服务器返回的数据类型
            , contentType: "application/json; charset=utf-8"
            , success: function (data) {
                if (data.code == 200)
                    window.location.href = data.data.url;
            }
            , error: function (data) {
                if (data.code === 401) {
                    error_token();
                }
                console.log("访问失败");
            }
        });
    });
}

