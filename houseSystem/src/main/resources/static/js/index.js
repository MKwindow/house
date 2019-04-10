//轮播
layui.use('carousel', function () {
    let carousel = layui.carousel;
    let opt = {
        elem: '#index_carousel'
        , width: '1000' //设置容器宽度
        , height: '400' //设置容器高度
        , arrow: 'hover' //始终显示箭头
        , anim: 'default' //切换动画方式
        , interval: '3000'//自动切换的时间间隔
        , indicator: 'inside'//指示器位置
        , autoplay: false //是否自动切换
    };

    let ins = carousel.render(opt);
    carouse(ins, opt);
});


//搜索特效
function searchToggle(obj, evt) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let container = $(obj).closest('.search-wrapper');
        if (!container.hasClass('active')) {
            container.addClass('active');
            evt.preventDefault();
        }
        else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            // clear and hide result container when we press close
            container.find('.result-container').fadeOut(100, function () {
                $(this).empty();
            });
        }
    });

}

//搜索点击事件
function submitFn(obj, evt) {
    layui.use('jquery', function () {
        let $ = layui.jquery;

        value = $(obj).find('.search-input').val().trim();
        let url = "/index/search";
        let parm;
        if (!value.length) {
            parm = {"address": ""};
        }
        else {
            parm = {"address": value};
        }
        // console.log(url + JSON.stringify(parm));
        // $.ajax({
        //     url: url
        //     , type: 'post'
        //     , data: JSON.stringify(parm)
        //     , dataType: 'json'//预期服务器返回的数据类型
        //     // , contentType: "application/json; charset=utf-8"
        //     , success: go
        // });
        localStorage.setItem("search_address", JSON.stringify(parm));
        window.location.href = "/search";
        $(obj).find('.result-container').fadeIn(100);
        evt.preventDefault();
    });
}

//跳转到路径
// function go(data) {
//     // console.log(data);
//     if (data.code == 200) {
//         window.location.href = data.data.url;
//     }
// }

//轮转函数
function carouse(ins, opt) {
    let carousel_data = null;
    let url = "http://localhost:8080/house/list";
    let data = {"pageNum": "1", "pageSize": "10", 'status': 1,'pay_b':0};
    //获取轮转数据
    use_ajax(url, data, function (data) {
        if (data.code === 200) {
            // carousel_data = {"list": data.data};
            carousel_data = carousel_parsing(data);
            update_carousel(carousel_data);
        }
    });

    function update_carousel(carousel_data) {
        layplmode(shuffling_template, 'show_index_carousel_template', carousel_data, ins, opt);
    }
}

get_page();


//分页数据操作
function get_page() {
    let page = {"pageNum": 1, 'pageSize': 6, 'status': 1,'pay_b':0};
    let url = "http://localhost:8080/house/list";
    use_ajax(url, page, function (data) {
        if (data.code === 200) {
            let page_data = {"list": data.data};
            page_data = page_parsing(data);
            update_page(page_data);
            jump_page(url, data);
        }
    });
}

//更新模板
function update_page(page_data) {
    let result1 = [];
    let result2 = [];
    let i = 0;
    layui.each(page_data.list, function (index, item) {
        if (index <= 2) {
            result1[index] = item;
        } else {
            result2[index % 3] = item;
        }
    });
    let list1 = {
        "list": result1
    };
    let list2 = {
        "list": result2
    };
    layplmode(card_template, 'show_index_main_template1', list1);
    layplmode(card_template, 'show_index_main_template2', list2);
}

//分页请求
function jump_page(url, res) {
    // console.log(res);
    layui.use(['laypage', 'layer'], function () {
        let laypage = layui.laypage
            , layer = layui.layer;
        laypage.render({
            elem: 'field'
            , count: res.data[0].total
            , limit: 6
            , first: false
            , last: false
            // , curr: location.hash.replace('#!fenye=', '')
            // , hash: 'fenye' //自定义hash值
            , jump: function (obj, first) {
                let curr = obj.curr,
                    limit = obj.limit;
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                let data = {"pageNum": curr, 'pageSize': limit, 'status': 1,'pay_b':0};
                //首次不执行
                if (!first) {
                    use_ajax(url, data, function (res) {
                        let page_data = page_parsing(res);
                        update_page(page_data);
                    });
                }
            }
        });
    });
}


//parm jS模型模板ID 渲染视图ID  渲染数据
function layplmode(modename, viewname, data, ins, opt) {
    layui.use(['laytpl', 'jquery', 'carousel'], function () {
        // laytpl.config({
        //     open: '<{%',
        //     close: '%}>'
        // });
        let laytpl = layui.laytpl,
            $ = layui.jquery,
            carousel = layui.carousel;
        let getTp_page = modename.innerHTML
            , view = document.getElementById(viewname);
        laytpl(getTp_page).render(data, function (html) {
            view.innerHTML = html;
            let msg = null;
            try {
                if ($.isFunction) {
                    ins.reload(opt);
                } else {
                    msg = "刷新轮播异常"
                }
            } catch (err) {
                if (msg != null)
                    console.log(msg);
            }
        });
    });
}

//详情页
function get_house(obj, event) {
    layui.use('jquery', function () {
        let $ = layui.jquery;
        let houseid = $(obj).find("input:hidden:first").val().trim();
        localStorage.setItem("houseid", houseid);
        window.location.href = '/index/show_detail';
        // $.ajax({
        //     url: url
        //     , type: 'post'
        //     , dataType: 'json'//预期服务器返回的数据类型
        //     , contentType: "application/json; charset=utf-8"
        //     , data: JSON.stringify(parm)
        //     , success: function (data) {
        //         if (data.code === 200) {
        //             window.location.href = data.data.url;
        //         }
        //     }
        //     , error: function () {
        //         console.log("访问失败");
        //     }
        // });
    });
}


function carousel_parsing(res) {
    let parm = res.data;
    // console.log(parm);
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
            "houseid": parm[0].list[i].id
        };
    }
    return {"list": list};
}

function page_parsing(res) {
    let parm = res.data;
    let list = [];
    let search = get_search_json();
    if (search == null) {
        layui.use('jquery', function () {
            let $ = layui.jquery;
            $.getJSON("/json/search.json", function (search_data) {
                for (let key in search_data.style) {
                    for (let i = 0, len = parm[0].list.length; i < len; i++) {
                        if (key == parm[0].list[i].style) {
                            parm[0].list[i].style = search_data.style[key];
                        }
                    }
                }
            });
        });
    } else {
        for (let key in search.style) {
            for (let i = 0, len = parm[0].list.length; i < len; i++) {
                if (key == parm[0].list[i].style) {
                    parm[0].list[i].style = search.style[key];
                }
            }
        }
    }
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
            "style": parm[0].list[i].style
        };
    }
    return {"list": list};
}