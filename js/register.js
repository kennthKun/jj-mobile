$(function () {
    $('#login').click(function () {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        console.log([username,password]);
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_user.php",
            "type":"POST",
            "data":{
                "status":"login",
                "username":username,
                "password":password
            },
            "dataType":"json",
            "success":function (reponse) {
                console.log(reponse);
                if(reponse.code ===0){
                    var data = reponse.data;
                    for(var prop in data){
                        if(data.hasOwnProperty(prop)){
                            localStorage.setItem(prop,data[prop]);
                        }
                    }
                    var callbackurl = location.hash.substr(20);
                    if(callbackurl){
                        location.assign(callbackurl);
                    }else {
                        location.assign('index.html');
                    }
                }
            }
        });
    });
    $("input[name = 'username']").blur(function () {
        console.log($(this).val());
        $.ajax({
            "url": 'http://h6.duchengjiu.top/shop/api_user.php',
            "type": "POST",
            "data": {
                "status": "check",
                "username": $(this).val()
            },
            "dataType": "json",
            "success": function (response) {
                console.log(response);
                if (response.code === 0) {
                    $("span[class = 'success']").show();
                    $("span[class = 'error']").hide();
                } else if (response.code === 2001) {
                    $("span[class = 'success']").hide();
                    $("span[class = 'error']").show();
                    $("span[class = 'error']").html("用户名已存在");
                }
            }
        });
    });
    $('#register').click(function () {
        var username = $('input[name = "username"]').val();
        if(username == ""){
            alert("用户名不能为空");
        }
        var password = $('input[name = "password"]').val();
        if(password == ""){
            alert("密码不能为空")
        }
        console.log([username,password]);
        $.ajax({
            "url" : "http://h6.duchengjiu.top/shop/api_user.php",
            "type" : "POST",
            "dataType" : "json",
            "data": {
                "status": "register",
                "username": username,
                "password": password
            },
            "success" : function (response) {
                console.log(response);
            }
        });

    });
 });
