layui.use(['table', 'jquery'], function () {
    let table = layui.table,
        form = layui.form,
        $ = layui.jquery,
        upload = layui.upload;
    let url = 'http://test.sunxiaoyuan.com:8080/house/list';
    let token = get_localStorage("TOKEN");
    let user = get_localStorage("USER");
    let retable = table.render({
        elem: '#renthourse'//表格绑定 根据id绑定
        , url: url //请求地址
        , method: 'POST'//请求方法
        , where: {"access_token": token.access_token, 'user_id': user.id}
        // , contentType: 'application/json'//发送到服务端的内容编码类型
        , toolbar: '#toolbar' //开启表格头部工具栏区域 左边图标
        , title: '房东房屋表格'//定义 table 的大标题（在文件导出等地方会用到
        , totalRow: false // 开启合计行
        , defaultToolbar: ['filter']
        , request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            , limitName: 'pageSize' //每页数据量的参数名，默认：limit
        },
        parseData: function (res) { //res 即为原始返回的数据
            let data = Apt_house(res);
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
        , cols: [
            [
                {type: 'radio', fixed: 'left'}
                , {
                field: 'houseid',
                title: '房屋编号',
                width: 100,
                fixed: 'left',
                unresize: true,//不可编辑
                sort: true,//排序
                totalRowText: '合计'
            }
                , {field: 'housestyle', title: '房屋类型', width: 120}
                , {field: 'area', title: '区域', width: 100}
                , {field: 'houseaddress', title: '房屋地址', width: 100}
                , {field: 'housearea', title: '房屋面积', width: 100, sort: true}
                , {field: 'housename', title: '房屋名称', width: 100}
                , {field: 'housefaci', title: '房屋设施', width: 100}
                , {field: 'zent', title: '租金', width: 80, sort: true}
                , {field: 'style', title: '风格', width: 80, sort: true}
                , {
                field: 'houseimage',
                title: '图片',
                width: 80,
                templet: '#img'
            }
                , {field: 'payway', title: '缴费方式', width: 100}
                , {field: 'housedate', title: '发布时间', width: 100, sort: true}
                , {field: 'city', title: '出租状态', width: 125, sort: true, templet: '#checkboxTp1'}
                , {field: 'attestation', title: '认证状态', width: 100, sort: true, templet: '#checkboxTp2'}
                , {fixed: 'right', title: '操作', toolbar: '#bar', width: 200}
            ]
        ]
        , page: true //分页开关
        , loading: false
    });

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
        switch (obj.event) {
            case 'del':
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    layer.close(index);
                });
                break;
            case 'edit':
                house_ajx(form);
                layer.open({
                    type: 1
                    , shade: 0.8
                    , offset: 'auto'
                    , content: $('#formedit')
                    , area: ['600px', '600px']
                    , shadeClose: true//点击外围关闭弹窗
                    , title: "编辑内容" //不显示标题
                    , success: function (layero, index) {
                        let seach = get_localStorage('SEARCH');
                        let valdata = res_Apd_update_seach(data, seach);
                        form.val("formedit", {
                            "houseid": data.houseid // "name": "value"
                            , 'housename': data.housename
                            , 'area': valdata.area
                            , "housestyle": data.housestyle
                            , "houseaddress": data.houseaddress
                            , "housearea": data.housearea
                            , "housefaci": data.housefaci
                            , "zent": data.zent
                            , "style": valdata.style
                            , "payway": valdata.payway
                            , "housedate": valdata.style
                        });
                        //表单提交
                        form.on('submit(up)', function (updata_data) {
                            let token = get_localStorage('TOKEN');
                            console.log(updata_data.field); //当前容器的全部表单字段，名值对形式：{name: value}
                            let sum_data = Apd_update_submit(updata_data.field);
                            let parm = Object.assign(sum_data, {'access_token': token.access_token});
                            $.ajax({
                                // url: '/test',
                                type: 'POST',
                                data: parm,
                                success: function (res) {
                                    if (res === 200) {
                                        layer.msg('修改成功', {icon: 1, time: 2000}, function () {
                                            update_obj(updata_data.field);
                                            layer.close(index);
                                        });
                                    }
                                },
                                error: function (res) {
                                    layer.msg('修改失败，意外意外', {icon: 1, time: 2000}, function () {
                                        layer.close(index);
                                    });
                                }
                            });

                            function update_obj(data) {
                                //将区域数字转换为字符
                                let Apd_update_Data = Apd_update_seach(data, seach);
                                //更新缓存里面的值
                                obj.update({
                                    "houseid": data.houseid // "name": "value"
                                    , 'housename': data.housename
                                    , 'area': Apd_update_Data.area
                                    , "housestyle": Apd_update_Data.housestyle
                                    , "houseaddress": data.houseaddress
                                    , "housearea": data.housearea
                                    , "housefaci": data.housefaci
                                    , "zent": data.zent
                                    , "style": Apd_update_Data.style
                                    , "payway": Apd_update_Data.payway
                                    , "housedate": data.housedate
                                });

                            }

                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    }
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
        // {"access_token": token.access_token}
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
        let upload = layui.upload;
        let $ = layui.jquery;
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
        // console.log(data);
    });
}

function uploadimg(rowdata) {
    //上传图片
    layui.use('upload', function () {
        let upload = layui.upload;
        let $ = layui.jquery;
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
    let img = new Image();
    img.src = obj.src;
    let height = img.height + 50; //获取图片高度
    let width = img.width; //获取图片宽度
    let imgHtml = "<img src='" + obj.src + "' width='500px' height='500px'/>";
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

function house_tpl(from, data) {
    layui.use('laytpl', function () {
        laytpl = layui.laytpl;
        laytpl.config({
            open: '<%',
            close: '%>'
        });
        let getTpl1 = housestyle_tpl.innerHTML,
            view1 = document.getElementById("housestyle_view");
        laytpl(getTpl1).render(data, function (html) {
            view1.innerHTML = html;
            from.render();
        });
        let getTpl2 = area_tpl.innerHTML,
            view2 = document.getElementById("area_view");
        laytpl(getTpl2).render(data, function (html) {
            view2.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        let getTpl3 = style_tpl.innerHTML,
            view3 = document.getElementById("style_view");
        laytpl(getTpl3).render(data, function (html) {
            view3.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
        let getTpl4 = payway_tpl.innerHTML,
            view4 = document.getElementById("payway_view");
        laytpl(getTpl4).render(data, function (html) {
            view4.innerHTML = html;
            try {
                from.render();
            } catch (err) {

            }
        });
    });
}

function house_ajx(from) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let search_data = get_localStorage("SEARCH");
        if (search_data == null || search_data === "" || typeof search_data === "undefined") {
            $.getJSON('/json/search.json', function (opt) {
                let data = {'value': opt.data, 'expirse': (new Date().getTime() + 86400000)};
                localStorage.setItem('SEARCH', JSON.stringify(data));
            });
        } else {
            house_tpl(from, search_data);
        }
    });
}

function get_localStorage(key) {
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


function Apt_house(data) {
    let swaplist = [];
    let swapdata = data.data[0].list;
    for (let i = 0, len = swapdata.length; i < len; i++) {
        let image = null;
        try {
            image = swapdata[i].pics[0].url
        } catch (err) {
            image = "/images/temp/property_01.jpg";
        }
        swaplist[i] = {
            "houseimage": image,
            "housename": swapdata[i].title,
            "zent": swapdata[i].rent,
            "houseid": swapdata[i].id,
            "houseaddress": swapdata[i].addr_detail,
            "style": swapdata[i].style,
            "area": swapdata[i].addr_id,
            "status": swapdata[i].status >= 2 ? true : false,
            "payway": swapdata[i].pay_a * 10 + swapdata[i].pay_b,
            "attestation": swapdata[i].status >= 1 ? true : false,
            "housedate": swapdata[i].create_time,
            "housearea": swapdata[i].area,
            "username": swapdata[i].username,
            "housefaci": swapdata[i].info,
            "housestyle": swapdata[i].type_a * 1000 + swapdata[i].type_b * 100 + swapdata[i].type_c * 10 + swapdata[i].type_d,
            "userid": swapdata[i].user_id
        };
    }
    let search_data = get_localStorage("SEARCH");
    return unpdate_search(swaplist, search_data)
}

function unpdate_search(swap, search) {
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
        for (let key in search.style) {
            if (swap[i].style == key)
                swap[i].style = search.style[key];
        }
        for (let key in search.areas) {
            if (swap[i].area == key)
                swap[i].area = search.areas[key];
        }
    }
    // debugger;
    return swap;
}

function Apd_add(txt) {

    let type_d = txt.housestyle % 10,
        type_c = parseInt(txt.housestyle / 10 % 10),
        type_b = parseInt(txt.housestyle / 100 % 10),
        type_a = parseInt(txt.housestyle / 1000 % 10),
        pay_b = txt.payway % 10,
        pay_a = parseInt(txt.payway / 10 % 10);
    let newData = new Date().toLocaleDateString();
    let userid = LocalStorage_Day.get("USER").id;
    let sum_swap = {
        "id": txt.houseid,
        "title": txt.housename,
        "area": txt.housearea,
        "addr_id": txt.area,
        "type_d": type_d,
        "type_c": type_c,
        "type_b": type_b,
        "type_a": type_a,
        "pay_b": pay_b,
        "pay_a": pay_a,
        "style": txt.style,
        "addr_detail": txt.houseaddress,
        "rent": txt.zent,
        "info": txt.housefaci,
        "status": txt, status,
        "user_id": userid,
        "create_time": newData
    };
    return sum_swap;
}

function res_Apd_update_seach(data, search) {
    for (let key in search.areas) {
        if (data.area == search.areas[key]) {
            data.area = key;
        }
    }
    for (let key in search.style) {
        if (data.style == search.style[key]) {
            data.style = key;
        }
    }
    for (let key in search.payway) {
        if (data.payway == search.payway[key]) {
            data.payway = key;
        }
    }
    for (let key in search.housestyle) {
        if (data.housestyle == search.housestyle[key])
            data.housestyle = key;
    }
    return data;
}

function Apd_update_seach(data, search) {
    for (let key in search.areas) {
        if (data.area == key) {
            data.area = search.areas[key];
        }
    }
    for (let key in search.style) {
        if (data.style == key) {
            data.style = search.style[key];
        }
    }
    for (let key in search.payway) {
        if (data.payway == key) {
            data.payway = search.payway[key];
        }
    }
    for (let key in search.housestyle) {
        if (data.housestyle == key)
            data.housestyle = search.housestyle[key];
    }
    return data;
}

function Apd_update_submit(data) {
    let type_d = data.housestyle % 10,
        type_c = parseInt(data.housestyle / 10 % 10),
        type_b = parseInt(data.housestyle / 100 % 10),
        type_a = parseInt(data.housestyle / 1000 % 10),
        pay_b = data.payway % 10,
        pay_a = parseInt(data.payway / 10 % 10);
    let swap = {
        'id': data.houseid,
        'title': data.housename,
        'type_a': type_a,
        'type_b': type_b,
        'type_c': type_c,
        'type_d': type_d,
        'pay_a': pay_a,
        'pay_b': pay_b,
        'area': data.housearea,
        'addr_id': data.area,
        'style': data.style,
        'rent': data.zent,
        'info': data.housefaci,
        'addr_detail': data.houseaddress
    }
    return swap;
}

