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
        xlogin: function (tokenUrl, userUrl, user, goUrl) {
            debugger;
            $.ajax({
                url: tokenUrl,
                type: 'POST',
                data: user,
                success: function (tokenRes) {
                    LocalStorage_Data.set('TOKEN', tokenRes, 7200000);
                    $.ajax({
                        url: userUrl,
                        type: 'POST',
                        data: {'access_token': tokenRes.access_token},
                        success: function (userRes) {
                            LocalStorage_Data.set('USER', userRes, 7200000);
                            layer.msg('登陆成功', {icon: 1}, function () {
                                window.location.href = goUrl;
                            });
                        },
                        error: function () {
                            layer.msg('用户获取失败', {icon: 2});
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
            opt.token_name === 'TOKEN' ? token = LocalStorage_Data.get('TOKEN').access_token : token = LocalStorage_Data.get(opt.token_name).access_token;
            if (opt.isheard === false) {
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
        set_cache: function (key, value, hours = 2) {
            LocalStorage_Data.set(key, value, hours)
        },
        get_cache: function (key) {
            LocalStorage_Data.get(key);
        },
    };
    exports("login", obj);
})
;

