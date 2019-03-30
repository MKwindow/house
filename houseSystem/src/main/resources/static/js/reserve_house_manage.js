layui.use(['table', 'jquery'], function () {
    var table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    // console.log(reserve_house_manage);
    var url = reserve_house_manage;
    var retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'get'//请求方法
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房屋预定管理'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        // , loading: true
        , limit: 8
        , cols: [
            [
                {type: 'checkbox', fixed: 'left'}
                , {
                field: 'reserveid',
                title: '预定编号',
                width: 130,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'housestyle', title: '房屋类型', width: 120}
                , {field: 'houseaddress', title: '房屋地址', width: 228}
                , {field: 'tenantname', title: '租客姓名', width: 100, sort: true}
                , {field: 'tenantphone', title: '租客电话', width: 120, sort: true, templet: '#showphone'}
                , {field: 'username', title: '个人姓名', width: 90}
                , {field: 'reservedate', title: '预约日期', width: 110, sort: true}
                , {field: 'payway', title: '缴费方式', width: 100}
                , {field: 'reservestate', title: '预约状态', width: 110, sort: true, templet: '#checkboxTp2'}
                , {field: 'remakes', title: '备注', width: 200, sort: true}
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 160}
            ]
        ]
        , page: true
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
                layer.confirm('真的取消么', function (index) {
                    obj.del();
                    layer.close(index);
                });
                break;
            case 'edit':
                console.log('更新');
                layer.confirm('同意对方的申请吗', function (index) {
                    //更新缓存里面的值
                    obj.update({
                        "reservestate": data.houseid // "name": "value"
                    });
                    layer.close(index);
                });
                break;
        }
    });
});
