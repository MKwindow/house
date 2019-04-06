function setCookie(name, value, expires, path, domain, secure) {
    if (typeof is_remember != "undefined")
        return false;
    let today = new Date();
    today.setTime(today.getTime());
    let expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires_date.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    let end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}


//访问失败后登陆token
const token = {
    get: function () {
        try {
            return LocalStorage_Day.get("TOKEN");//获取名称为“key”的值
        } catch (err) {
            window.location.href = '/admin/login'
        }
    },
    set: function (token) {
        LocalStorage_Day.set("TOKEN", token, 1 / 24);
    },
};


const LocalStorage_Day = {
    set: function (key, value, num) {
        let date = 3600 * 1000 * 24 * num;
        LocalStorage_Data.set(key, value, date);
    },
    get: function (key) {
        return LocalStorage_Data.get(key);
    }
};

const LocalStorage_Data = {
    set: function (key, value, ttl_ms) {
        let data = {value: value, expirse: (new Date().getTime() + ttl_ms)};
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
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
};




