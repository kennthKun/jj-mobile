var loginOut = document.getElementsByClassName("login-out")[0];
var usernameText = document.getElementsByClassName("username")[0];
console.log(usernameText);
if (!localStorage.getItem('token')){
    location.href = "login.html#callbackurl="+location.href;

}else {
    usernameText.innerText = localStorage.getItem('username');
}
loginOut.onclick = function () {
    localStorage.clear();
    location.href = "login.html#callbackurl="+location.href;
}
