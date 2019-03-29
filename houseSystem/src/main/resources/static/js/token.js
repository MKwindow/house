var token = localStorage.getItem("token");//获取名称为“key”的值
if (token == null || token === "") {
    var userform = document.getElementById("signform");
    if (userform != null) {
        popwindows();
    }
    window.location.href = houser_index_url;
}