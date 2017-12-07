$.getQueryString= function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
    return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
        return dictionObj[$1];
    });
};

//fetch 获取  goods 商品 category分类 detail详情 config配置
window.shop = {
    config: {
        API_PREFIX: "http://h6.duchengjiu.top/shop/",
        PAGESIZE: 10,
        USER_TOKEN: 'token',
        CART_PREFIX: 'cart_id'//在本地存储商品ID和对应数量的时候使用
    },
    base: {
        storage: {
            "setItem": function(k, v) {
                return localStorage.setItem(k, v);
            },
            "getItem": function(k) {
                return localStorage.getItem(k);
            }
        },
        business: {
            "getToken": function() {
                return shop.base.storage.getItem(shop.config.USER_TOKEN);
            },
            "saveGoodsInfoOfCart": function(goods_id, number) {
                return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
            }
        }
    },
    api: {
        fetchGoodsCategory: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
        },
        fetchGoodsListByCatId: function(cat_id, callback){
            $.get(shop.config.API_PREFIX + 'api_goods.php', "cat_id="+cat_id, callback, 'json');
        },
        fetchGoodsDetail: function(goods_id, callback) {
            $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
        },
        fetchHotGoods: function(callback){
            $.get(shop.config.API_PREFIX + 'api_goods.php', callback, 'json');
        },
        searchGoods: function(opts){
            var data = {};
            data.search_text = opts.search_text;
            data.page = opts.page || 1;
            data.pagesize = opts.pagesize || shop.config.PAGESIZE;
            var callback = opts.callback;

            $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
        },
        checkUsernameUnique: function(username, callback) {
            var data = {
                "status": "check",
                "username": username
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        register: function(username, password, callback){
            var data = {
                "status": "register",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        login: function(username, password, callback){
            var data = {
                "status": "login",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        updateCart: function(goods_id, number, callback) {
            var data = {
                "goods_id": goods_id,
                "number": number
            };
            $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
        },
        fetchCart: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        fetchUserAddress: function(callback) {
            $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addUserAddress: function(data, callback){
            $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
        },
        delteUserAddress: function(){

        },
        editUserAddress: function(){ },//:TODO
        fetchOrder: function(){

        },
        addOrder: function(){

        },
        cancelOrder: function(){

        }
    }
};

var searchBtn = $("#search");
if (searchBtn.length === 1) {
    searchBtn.click(function(){
        location.href = 'search.html?search_text=' + $(".form-control").val();
    });
}






var header = document.getElementsByTagName("header")[0];
var footer = document.getElementsByTagName("footer")[0];
var carousel = document.getElementsByClassName("carousel")[0];
var con = document.getElementsByClassName("con")[0];
var accounts = document.getElementsByClassName("accounts")[0];
console.log(accounts);

// inif();
// window.onresize = inif;
// function inif(){
//     var windowWidth = document.documentElement.clientWidth;
//     header.style.height =  windowWidth / (640 / 80) + 'px';
//     footer.style.height =  windowWidth / (640 / 80) + 'px';
//     header.style.maxHeight =  '130px';
//     footer.style.maxHeight =  '130px';
//     carousel.style.height =  windowWidth / (750 / 352) + 'px';
//     con.style.marginTop = header.offsetHeight + 'px';
//     accounts.style.height =  footer.offsetHeight;
//     console.log(footer.offsetHeight);
//     // console.log(accounts.style.height);
//     accounts.style.bottom =  windowWidth / (640 / 80) + 'px';
// }


if (localStorage.getItem('token')) {
    $('.index-username').html(localStorage.getItem('username'));
    // $(".vim").show();
    // $(".vim").click(function(){
    //   localStorage.clear();
    //   $(".vim").hide();
    //   $(".index-username").text("");
    // })

} else{
    $(".vim").hide();
}

