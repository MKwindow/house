layui.define(["layer", "jquery"], function (exports) {
    let $ = layui.jquery,
        layer = layui.layer;
    let LocalStorage_Data = {
        set: function (key, value, ttl_ms) {
            let data = {value: value, expirse: (new Date().getTime() + ttl_ms)};
            localStorage.setItem(key, JSON.stringify(data));
        },
        get: function (key) {
            let data = JSON.parse(localStorage.getItem(key));
            if (data !== null) {
                if (data.expirse != null && data.expirse < new Date().getTime()) {
                    localStorage.removeItem(key);
                } else {
                    return data.value;
                }
            }
            return null;
        }
    };
    let obj = {
        xlogin: function (tokenUrl, userUrl, user, goUrl = null, type = 'POST', callback) {
            // debugger;
            $.ajax({
                url: tokenUrl,
                type: type,
                data: user,
                success: function (tokenRes) {
                    LocalStorage_Data.set('TOKEN', tokenRes, 7200000);
                    $.ajax({
                        url: userUrl,
                        type: type,
                        data: {'access_token': tokenRes.access_token},
                        success: function (userRes) {
                            LocalStorage_Data.set('USER', userRes, 7200000);
                            if (typeof callback === "function") {
                                callback(userRes);
                            }
                            if (goUrl == null) {
                                return false;
                            } else {
                                layer.msg('登陆成功', {icon: 1}, function () {
                                    window.location.href = goUrl;
                                });
                            }
                        },
                        error: function () {
                            layer.msg('用户名或者密码错误，请重新再试', {icon: 2});
                        }
                    });
                },
                error: function (res) {
                    layer.msg('认证失败', {icon: 2});
                }
            });
        },
        xajax: function (opt = {
            'url': null,
            'data': null,
            'success': null,
            'error': null,
            'token_name': 'TOKEN',
            'isheard': false,
        }) {
            let token,
                parm;
            opt.token_name === 'TOKEN' || typeof opt.token_name === 'undefined' ? token = LocalStorage_Data.get('TOKEN').access_token : token = LocalStorage_Data.get(opt.token_name).access_token;
            if (opt.isheard === false || typeof  opt.isheard === 'undefined') {
                parm = Object.assign(opt.data, {'access_token': token});
                $.ajax({
                        url: opt.url,
                        type: 'POST',
                        data: parm,
                        success: opt.success,
                        error: opt.error
                    }
                )
            } else {
                parm = opt.data;
                $.ajax({
                    url: opt.url,
                    headers: {'access_token': token},
                    type: 'POST',
                    data: parm,
                    success: opt.success,
                    error: opt.error
                })
            }
        },
        get_token: function () {
            return LocalStorage_Data.get('TOKEN');
        },
        get_User: function () {
            try {
                let token = LocalStorage_Data.get('TOKEN');
                if (token !== null) {
                    return LocalStorage_Data.get('USER');
                } else {
                    return null;
                }
            } catch (err) {
                return null;
            }
        },
        set_cache: function (key, value, hours = 2) {
            let swap = 3600000 * hours;
            LocalStorage_Data.set(key, value, swap);
        },
        get_cache: function (key) {
           return LocalStorage_Data.get(key);
        },
        error_token: function (url) {
            try {
                let token = LocalStorage_Data.get('TOKEN');
                if (token == null) {
                    layer.msg('没有获取授权', {icon: 2, time: 1000}, function () {
                        window.location.href = url
                    });
                }
            } catch (erro) {
                layer.msg('没有获取授权', {icon: 2, time: 1000}, function () {
                    window.location.href = url
                });
            }
        },
        formatDate:function () {
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
        }
    };
    exports("xajax", obj);
});


