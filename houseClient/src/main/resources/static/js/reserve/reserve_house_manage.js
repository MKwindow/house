layui.use(['table', 'jquery'], function () {
    let table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    let url = 'http://localhost:8080/reserve/list';
    let token = get_LocalStorage("TOKEN");
    // let swap = {"Authorization": "Bearer" + "\xa0" + token.access_token};
    let user = get_LocalStorage('USER');
    let retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'POST'//请求方法
        // , headers: swap

        , where: {"access_token": token.access_token, 'owen_id': user.id,'close':0}
        , request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            , limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        , parseData: function (res) { //res 即为原始返回的数据
            // debugger;
            let data = Apt_reserve(res);
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data[0].total, //解析数据长度
                "data": data //解析数据列表
            };
        }

        , response: {
            // statusName: 'status' ,  //规定数据状态的字段名称，默认：code
            statusCode: 200 //规定成功的状态码，默认：0
            // , msgName: 'hint' //规定状态信息的字段名称，默认：msg
            // , countName: 'total' //规定数据总数的字段名称，默认：count
            // , dataName: 'data' //规定数据列表的字段名称，默认：data
        }
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房东预定管理'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        , id: 'house'
        , defaultToolbar: []
        // , loading: true
        , limit: 8
        , cols: [
            [
                {type: 'radio', fixed: 'left'}
                , {
                field: 'reserveid',
                title: '预定编号',
                width: 100,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'houseid', title: '房屋编号', hide: true}
                , {field: 'userid', title: '用户编号', hide: true}
                , {field: 'owenid', title: '房东编号', hide: true}
                , {field: 'housestyle', title: '房屋类型', width: 120}
                , {field: 'houseaddress', title: '房屋地址', width: 228}
                , {field: 'tenantname', title: '租客姓名', width: 100, sort: true}
                , {field: 'tenantphone', title: '租客电话', width: 120, sort: true, templet: '#showphone1'}
                , {field: 'owenphone', title: '房东电话', width: 120, sort: true, templet: '#showphone2', hide: true}
                , {field: 'username', title: '房东姓名', width: 90}
                , {field: 'reservedate', title: '预约日期', width: 110, sort: true}
                , {field: 'payway', title: '缴费方式', width: 100}
                , {field: 'reservestate', title: '预约状态', width: 110, sort: true, templet: '#checkboxTp2'}
                , {field: 'zent', title: '租金', width: 90, sort: true}
                , {field: 'area', title: '房屋面积', width: 100, sort: true}
                , {field: 'create_time', title: '创建时间', width: 100, sort: true}
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 160}

            ]
        ]
        , page: true
    });

    function Apt_reserve(data) {
        // debugger;
        let list = data.data[0].list;
        try {
            let search = get_LocalStorage('SEARCH');
            return success(search, list);
        } catch (err) {
            $.getJSON('/json/search.json', function (opt) {
                let data = {'value': opt.data, 'expirse': (new Date().getTime() + 86400000)};
                localStorage.setItem('SEARCH', JSON.stringify(data));
            });
        }

        function success(opt, list) {
            let search = opt;
            let swap = [];
            for (let i = 0, len = list.length; i < len; i++) {
                if (user.id !== list[i].u_user_id) {
                    i--;
                    len--;
                    continue;
                } else {
                    swap[i] = {
                        'houseaddress': list[i].addr_detail,
                        'area': list[i].area,
                        'reservedate': list[i].time,
                        'houseid': list[i].house_id,
                        'payway': list[i].pay_a,
                        'username': list[i].u_nick_name,
                        'reservestate': list[i].status == 0 ? false : true,
                        'tenantphone': list[i].phone,
                        'tenantname': list[i].nick_name,
                        'zent': list[i].rent,
                        'housestyle': list[i].type_a * 1000 + list[i].type_b * 100 + list[i].type_c * 10 + list[i].type_d,
                        'userid': list[i].user_id,
                        'owenid': list[i].u_user_id,
                        'reserveid': list[i].id,
                        'owenphone': list[i].u_phone,
                        "create_time": list[i].create_time
                    }
                }
            }
            for (let i = 0, len = swap.length; i < len; i++) {
                for (let key in search.payway) {
                    if (swap[i].payway == key) {
                        swap[i].payway = search.payway[key];
                    }
                }
                for (let key in search.housestyle) {
                    if (swap[i].housestyle == key)
                        swap[i].housestyle = search.housestyle[key];
                }
            }
            return swap;
        }
    }

    //工具栏事件
    table.on('toolbar(hourse)', function (obj) {
        let checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'flush':
                retable.reload();
                break;
        }
    });
    //监听行工具事件
    //右侧
    table.on('tool(hourse)', function (obj) {
        let data = obj.data;
        // console.log(obj);
        switch (obj.event) {
            case 'del':
                layer.confirm('真的取消么', function (index) {
                    obj.del();
                    $.ajax({
                    	url:'http://localhost:8080/reserve/update',
                    	type:'POST',
                    	data:{'id': data.reserveid,'close':1,'access_token': token.access_token},
                    	success:function(res){
                    		layer.msg('修改成功', {icon: 1, time: 1000});
                    	},
                    	error:function(){
                    		layer.msg('修改失败', {icon: 2, time: 1000});
                    	}
                    });
                    layer.close(index);
                });
                break;
            case 'edit':
                layer.confirm('同意对方的申请吗', function (index) {
                    let parm = {
                        'id': data.reserveid,
                        'status': data.reservestate + 1,
                        'access_token': token.access_token
                    };
                    $.ajax({
                        url: 'http://localhost:8080/reserve/update',
                        type: 'POST',
                        data: parm,
                        success: function (res) {
                            layer.msg('修改成功', {icon: 1, time: 1000});
                            obj.update({
                                "reservestate": data.reservestate + 1 // "name": "value"
                            });
                        }
                        , error: function () {
                            layer.msg('修改失败', {icon: 2, time: 1000});
                        }
                    });
                    layer.close(index);
                });
                break;
        }
    });
});

function get_LocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
        // debugger
        if (data.expirse != null && data.expirse < new Date().getTime()) {
            localStorage.removeItem(key);
        } else {
            return data.value;
        }
    }
    return null;
}

