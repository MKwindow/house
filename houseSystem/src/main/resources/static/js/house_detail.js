layui.use(['laytpl', 'jquery', 'layer'], function () {
    let laytpl = layui.laytpl,
        $ = layui.jquery,
        layer = layui.layer;
    let houseid = localStorage.getItem("houseid");
    let token = get_LocalStorage('TOKEN');
    let url = 'http://test.sunxiaoyuan.com:8080/house/list';
    $.ajax({
        async: false
        , url: url
        , type: 'POST'
        , data: {"id": houseid, "access_token": token.access_token}
        , success: function (res) {
            // localStorage.setItem("house", JSON.stringify(res));
            det_tpl(res);

            function det_tpl(data) {
                let parm = data.data;
                let list = [];
                for (let i = 0, len = parm[0].list.length; i < len; i++) {
                    let image = null;
                    try {
                        image = parm[0].list[i].pics[0].url
                    } catch (err) {
                        image = "/images/temp/property_01.jpg";
                    }
                    list[i] = {
                        "images": image,
                        "housename": parm[0].list[i].title,
                        "zent": parm[0].list[i].rent,
                        "houseid": parm[0].list[i].id,
                        "houseaddress": parm[0].list[i].addr_detail,
                        "style": parm[0].list[i].style,
                        "housearea": parm[0].list[i].addr_id,
                        "address": parm[0].list[i].addr_detail,
                        "status": parm[0].list[i].status >= '3' ? true : false,
                        "payway": parm[0].list[i].pay_a * 10 + parm[0].list[i].pay_b,
                        "attestation": parm[0].list[i].status >= '1' ? true : false,
                        "date": parm[0].list[i].create_time,
                        "area": parm[0].list[i].area,
                        "username": parm[0].list[i].username,
                        "faci": parm[0].list[i].info,
                        "housestyle": parm[0].list[i].type_a * 1000 + parm[0].list[i].type_b * 100 + parm[0].list[i].type_c * 10 + parm[0].list[i].type_d,
                        "userid": parm[0].list[i].user_id
                    };

                }
                parming({"list": list});
            }

            function parming(data) {
                let search = get_LocalStorage("SEARCH");
                if (search == null) {
                    layui.use('jquery', function () {
                        let $ = layui.jquery;
                        $.getJSON("/json/search.json", function (search_data) {
                            toString_detil1(search_data, data);

                            function toString_detil1(search, data) {
                                for (let key in search.areas) {
                                    if (data.list[0].housearea == key) {
                                        data.list[0].housearea = search.areas[key];
                                    }
                                }
                                for (let key in search.style) {
                                    if (data.list[0].style == key) {
                                        data.list[0].style = search.style[key];
                                    }
                                }
                                for (let key in search.payway) {
                                    if (data.list[0].payway == key) {
                                        data.list[0].payway = search.payway[key];
                                    }
                                }
                                for (let key in search.housestyle) {
                                    if (data.list[0].housestyle == key)
                                        data.list[0].housestyle = search.housestyle[key];
                                }
                                showdetail1(data.list[0]);
                            }

                            function showdetail1(data) {
                                let getTpl = demo.innerHTML
                                    , view = document.getElementById('detail');
                                laytpl(getTpl).render(data, function (html) {
                                    view.innerHTML = html;
                                    // localStorage.removeItem("houseid");
                                });
                            }
                        });
                    });
                } else {
                    toString_detil(search, data);
                }
            }

            function toString_detil(search, data) {
                for (let key in search.areas) {
                    if (data.list[0].housearea == key) {
                        data.list[0].housearea = search.areas[key];
                    }
                }
                for (let key in search.style) {
                    if (data.list[0].style == key) {
                        data.list[0].style = search.style[key];
                    }
                }
                for (let key in search.payway) {
                    if (data.list[0].payway == key) {
                        data.list[0].payway = search.payway[key];
                    }
                }
                for (let key in search.housestyle) {
                    if (data.list[0].housestyle == key)
                        data.list[0].housestyle = search.housestyle[key];
                }
                showdetail(data.list[0]);
            }

            function showdetail(data) {
                let getTpl = demo.innerHTML
                    , view = document.getElementById('detail');
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                    // localStorage.removeItem("houseid");
                });
            }
        }
    });
    $('#reservation_house').click(function () {
        let url = 'http://test.sunxiaoyuan.com:8080/reserve/add';
        let token = get_LocalStorage('TOKEN').access_token;
        let houseid = localStorage.getItem("houseid");
        let userid = $('#user_id').val();
        let _content = '<div>' +
            '<span>请选择时间，不填默认2019-01-01</span><input class="layui-input timer" id="timer" placeholder="开始时间"/>' +
            '</div>';
        layer.open({
            type: 1,
            btn: ['确定', '取消'],
            title: '选择预约日期',
            content: _content,
            yes: function (index) {
                let time = $('#timer').val();
                let parm = {
                    'user_id': userid,
                    'house_id': houseid,
                    'create_time': new Date(),
                    'time': new Date(time),
                    'access_token': token
                };
                // console.log(parm);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: parm,
                    success: function (res) {
                        console.log(res);
                        if (res.code === 200) {
                            console.log('预约成功');
                        }
                    },
                    error(res) {
                        console.log(res);
                    }
                });
            },
            btn2: function (index) {
                layer.close(index);
            }
        });

        layui.use('laydate', function () {
            let laydate = layui.laydate;
            laydate.render({
                elem: '#timer'
                , min: '2019-01-01 00:00:00'
                , max: '2099-06-16 23:59:59'
                , value: '2019-01-01 00:00:00'
                , istoday: false
                , choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
                , type: 'datetime'
                , istime: true
                , format: 'yyyy-MM-dd HH:mm:ss'
                , btns: ['clear', 'confirm']
            });
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

    Date.prototype.format = function (fmt) {
        let o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

});