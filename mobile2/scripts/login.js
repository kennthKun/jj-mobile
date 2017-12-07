//输入框焦点事件
var usernameInput = document.querySelector("#username");
var passwordInput = document.querySelector("#password");
console.log(usernameInput);
usernameInput.onfocus = function () {
  this.placeholder = "";
}
usernameInput.onblur = function () {
    this.placeholder = "用户名";
}
passwordInput.onfocus = function () {
    this.placeholder = "";
}
passwordInput.onblur = function () {
    this.placeholder = "密码";
}
//立即注册按钮改变事件
var register = document.getElementById("register");
var login = document.getElementById("login");
register.onclick = function () {
    if (register.innerText === "立即注册") {
        this.innerText = "立即登录";
        login.innerText = "立即注册";
    }else {
        this.innerText = "立即注册";
        login.innerText = "立即登录";
    }
}
//登录按钮事件
login.onclick = function () {
    if (login.innerText === "立即注册") {
        new Register();
    } else if (login.innerText === "立即登录") {
        new Login();
    }
}
function Login() {
    var username = usernameInput.value;
    var password = passwordInput.value;
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "post",
        "dataType":"JSON",
        "data":{
            "status": "login",
            "username": username,
            "password": password,
        },
        "success": function (response) {
            console.log(response);
            if ( response.code != 0) {
                $("#warp").css("display","block").css("opacity","1");
                if(response.message === "少传参数username"){
                    $("#warp").text("请输入用户名");
                } else {
                    $("#warp").text(response.message);
                }
                setTimeout(function () {
                    $("#warp").css("display","none").css("opacity","0");
                },2000)
            } else if ( response.code === 0) {
                var data = response.data;
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        localStorage.setItem(prop, data[prop]);
                    }
                }
                //判断有callbackurl则跳回到指定的callbackurl页面, 否则跳到首页
                var callbackurl = location.hash.substr(13);
                if (callbackurl) {
                    location.assign(callbackurl);
                } else {
                    location.href = "index.html";
                }
            }
        }
    })
}
function Register() {
    var username = usernameInput.value;
    var password = passwordInput.value;
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "type": "post",
        "dataType":"JSON",
        "data":{
            "status": "register",
            "username": username,
            "password": password,
        },
        "success": function (response) {
            console.log(response);
            if ( response.code != 0) {
                $("#warp").css("display","block").css("opacity","1");
                if(response.message === "少传参数username"){
                    $("#warp").text("请输入用户名");
                } else {
                    $("#warp").text(response.message);
                }
                setTimeout(function () {
                    $("#warp").css("display","none").css("opacity","0");
                },2000)
            } else if(response.code === 0) {
                $("#warp").css("display","block").css("opacity","1");
                $("#warp").text("注册成功,已登录");
                new Login();
                setTimeout(function () {
                    $("#warp").css("display","none").css("opacity","0");
                    //判断有callbackurl则跳回到指定的callbackurl页面, 否则跳到首页
                    var callbackurl = location.hash.substr(13);
                    if (callbackurl) {
                        location.assign(callbackurl);
                    } else {
                        location.href = "index.html";
                    }
                },500);

            }

        }
    })
}




