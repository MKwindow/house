var protocol = window.location.protocol;
var hostname = location.hostname;
var port = location.port;
var static = '/resources/static';
var static_url = protocol + '//' + hostname + ':' + port + static;
var no_static_url = protocol + '//' + hostname + ':' + port;

if (port == 8081) {
    //主页路径
    var houser_index_url = no_static_url + '/index'
    //房屋管理页面路径
    var houser_static_url = no_static_url + '/json/rent_manage.json';
    //登陆页面路径
    //用户个信息页面路径
    var user_show_url = no_static_url + '/json/usershow.json'
    //登陆路径
    var user_login_url = no_static_url + '/login';
} else {
    //房屋管理页面路径
    var houser_static_url = static_url + '/json/rent_manage.json';
    //用户个信息页面路径
    var user_show_url = static_url + '/json/usershow.json'
}

