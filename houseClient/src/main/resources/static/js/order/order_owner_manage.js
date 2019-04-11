layui.use(['table', 'jquery'], function () {
    let table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    let url = "http://localhost:8080/order/list";
    let token = get_LocalStorage("TOKEN");
    let user = get_LocalStorage("USER");
    let retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'POST'//请求方法
        , where: {"access_token": token.access_token, 'owen_id': user.id,'close':0}
        , request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            , limitName: 'pageSize' //每页数据量的参数名，默认：limit
        },
        parseData: function (res) { //res 即为原始返回的数据
            let data = Apt_reserve(res);
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data[0].total, //解析数据长度
                "data": data //解析数据列表
            };
        }
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , defaultToolbar: []
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房东房屋表格'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        ,text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
        , cols: [
            [
                {type: 'radio', fixed: 'left'}
                , {
                field: 'contractid',
                title: '合同编号',
                width: 100,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'ownerid', title: '房东编号', width: 80, hide: true}
                , {field: 'ownername', title: '房东姓名', width: 80}
                , {
                field: 'owneridentity',
                title: '房东身份证',
                width: 140,
                templet: '#idcard1',
                sort: true
            }
                , {field: 'ownerphone', title: '房东电话', width: 120, hide: true}
                , {field: 'houseid', title: '房屋编号', width: 100, sort: true}
                , {field: 'housename', title: '房屋名称', width: 100}
                , {field: 'tenantid', title: '租客编号', width: 100, hide: true}
                , {field: 'tenantname', title: '租客名字', width: 100}
                , {field: 'tenantphone', title: '租客电话', width: 120, sort: true}
                , {
                field: 'tenantidentity',
                title: '租客身份证',
                width: 140,
                templet: '#idcard2',
                sort: true,
                hide: true
            }
                , {field: 'renpayable', title: '应交租金', width: 90, sort: true}
                , {field: 'startdate', title: '签订时间', width: 100, sort: true}
                , {field: 'enddata', title: '到期时间', width: 100, sort: true}
                , {
                title: '房屋详情',
                width: 90,
                templet: '#houser'
            }
                , {field: 'remark', title: '备注', width: 100}
                , {field: 'status', title: '认证状态', width: 100, sort: true, templet: '#checkboxTp2'}
                 ,{field: 'define', title: '签订状态', width: 100, sort: true, templet: '#checkboxTp3'} 
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 240}
            ]
        ]
        , page: true //分页开关
        , loading: false
    });

    //工具栏事件
    table.on('toolbar(order)', function (obj) {
        let checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'flush':
                retable.reload();
                break;
        }
    });
    //监听行工具事件
    //右侧
    table.on('tool(order)', function (obj) {
        let data = obj.data;
        // console.log(obj);
        switch (obj.event) {
            case 'orderSigned':
            	if(data.status === false){
            		layer.msg('没有认证，认证去吧', {icon: 2, time: 1000});
            		return false;
            	}
            	let define = data.define;
            	if((define & 2) === 2){
            		layer.msg('你已经确认了', {icon: 2, time: 1000});
            		return false;
            	}
            	 layer.confirm('真的确认了么，不可修改的哦', function (index) {
                     $.ajax({
                     	url:'http://localhost:8080/order/update',
                     	type:'POST',
                     	data:{'id': data.contractid,'define':define^2,"access_token": token.access_token},
                     	success:function(res){
                     		layer.msg('修改成功', {icon: 1, time: 1000});
                     		obj.update({
                     			'define':(define^2)
                     		});
                     	},
                     	error:function(){
                     		layer.msg('修改失败', {icon: 2, time: 1000});
                     	}
                     });
                     layer.close(index);
                 });
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

    function Apt_reserve(data) {
        // debugger;
        let user = get_LocalStorage("USER");
        let list = data.data[0].list;
        let swap = [];
        for(let i = 0,len = list.length; i < len; i++ ){
            swap[i] = {
                'contractid': list[i].id,
                'ownerid': list[i].u_user_id,
                'ownername': list[i].u_nick_name,
                'owneridentity': list[i].u_id_card,
                'ownerphone': list[i].u_phone,
                'housename': list[i].title,
                'houseid': list[i].house_id,
                'tenantid': list[i].user_id,
                'tenantname': list[i].nick_name,
                'tenantphone': list[i].phone,
                'tenantidentity': list[i].id_card,
                'renpayable': list[i].rent,
                'startdate': list[i].start_time,
                'enddata': list[i].end_time,
                "remark": list[i].remark,
                'status': list[i].status == 0 ? false : true,
                'define': list[i].define
            }
        }
        return swap;
    }

});

//上传
function uploadData(data) {
    layui.use('upload', function () {
        let upload = layui.upload;
        let $ = layui.jquery;
        let id = data.houseid;
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
    });
}

function show_house(obj, event) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let id = $(obj).siblings("input[type='hidden']").val().trim();
        localStorage.setItem('houseid', id);
        window.location.href = '/index/show_detail';
    });
}


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

