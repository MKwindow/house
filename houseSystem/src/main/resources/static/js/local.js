//访问失败后登陆token
const token = {
    get: function () {
        return LocalStorage_Day.get("TOKEN");//获取名称为“key”的值
    },
    set: function (token) {
        LocalStorage_Day.set("TOKEN", token, 1);
    },
    error: function () {
        var token = LocalStorage_Day.get("TOKEN");//获取名称为“key”的值
        if (token == null || token === "") {
            var userform = document.getElementById("signform");
            if (userform != null) {
                popwindows();
            }
            window.location.href = '/index';
        }
    }
};


const LocalStorage_Day = {
    set: function (key, value, num) {
        var data = 3600 * 1000 * 24 * num;
        LocalStorage_Data.set(key, value, data);
    },
    get: function (key) {
        return LocalStorage_Data.get(key);
    }
};

const LocalStorage_Data = {
    set: function (key, value, ttl_ms) {
        var data = {value: value, expirse: (new Date().getTime() + ttl_ms)};
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
        var data = JSON.parse(localStorage.getItem(key));
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
};
