var shopList = document.getElementById("shop-list");
var listinner = shopList.getElementsByTagName("a");
//搜索框事件
var search = document.querySelector(".form-control");
console.log(search);
search.onfocus = function () {
    document.onkeydown = function (event) {
        event = event || window.event;
        if ( event.keyCode === 13) {
            var searchVal = search.value;
            console.log(searchVal);
            location.href = "search.html?search_text="+searchVal;
        }
    }
}
//获取商品分类列表
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_cat.php",
    "type": "get",
    "dataType": "JSON",
    "success": function (response) {
        // console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            listinner[i].innerText = obj.cat_name;
            listinner[i].href = "list.html?id=" + obj.cat_id;
        }
    }
});
//获取内容列表
    var cat_id = $.getQueryString('id');
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id,
        "type": "get",
        "dataType": "JSON",
        "success": function(response) {
            if (response.code === 1) {
               $(".shop-list-content").css("display","none");
               $("#shop-list-warp").append("<div class ='friendly-reminder'>此分类下没有商品</div>")
            }else {
                $(".shop-list-content").css("display","block");
            }
                console.log(response);
                var length = response.data.length;
                //获取节点 并且克隆对应的数量
                var shopList = document.querySelector(".shop-list-content");
                for (var i = 1; i < length; i++) {
                    var cNode = shopList.cloneNode(true);
                    $("#shop-list-warp").append(cNode);
                }
                //获取新的列表内容 存倒数组
                var newShopList = document.querySelectorAll(".shop-list-content");
                var oImgArr = [];
                var oAArr = [];
                var oHArr = [];
                var oPArr = [];
                var priceArr = [];
                for (var j = 0; j < newShopList.length; j++) {
                    var oA = newShopList[j].getElementsByTagName("a")[0];
                    var oImg = newShopList[j].getElementsByTagName("img")[0];
                    var oH = newShopList[j].getElementsByTagName("h3")[0];
                    var oP = newShopList[j].getElementsByTagName("p")[0];
                    var price = newShopList[j].getElementsByTagName("b")[0];
                    oAArr.push(oA);
                    oImgArr.push(oImg);
                    oHArr.push(oH);
                    oPArr.push(oP);
                    priceArr.push(price);
                }
                console.log(oAArr);
                for (var k = 0; k < response.data.length; k++) {
                    var obj = response.data[k];
                    oAArr[k].href = "detail.html?goods_id=" + obj.goods_id;
                    oImgArr[k].src = obj.goods_thumb;
                    oHArr[k].innerText = obj.goods_desc;
                    oPArr[k].innerText = obj.goods_name;
                    priceArr[k].innerText = "￥" + obj.price;
                }
        }
    });
//懒加载
var page = 1;
$(window).scroll(function() {
    // var cat_id = $.getQueryString('id');
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var scrollTop = document.body.scrollTop;
        if ((documentHeight - windowHeight) === scrollTop) {
            page ++;
            if(page > 10) {
                $(".footer-hint").css("display","block");
                return;
            }
            console.log(page);
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id+"&page="+page,
                "type": "get",
                "dataType": "JSON",
                "success": function (response) {
                    console.log(response);
                    var length = response.data.length;
                    //获取节点 并且克隆对应的数量
                    var shopList = document.querySelector(".shop-list-content");
                    var oAArr = [];
                    var oImgArr = [];
                    var oHArr = [];
                    var oPArr = [];
                    var priceArr = [];
                    for (var i = 1; i < length; i ++){
                        var obj = response.data[i];
                        var cNode = shopList.cloneNode(true);
                        var oA = cNode.querySelectorAll("a");
                        oAArr.push(oA);
                        var oImg = cNode.getElementsByTagName("img")[0];
                        oImgArr.push(oImg);
                        var oH = cNode.getElementsByTagName("h3")[0];
                        oHArr.push(oH);
                        var oP = cNode.getElementsByTagName("p")[0];
                        oPArr.push(oP);
                        var price = cNode.getElementsByTagName("b")[0];
                        priceArr.push(price);
                        $("#shop-list-warp").append(cNode);
                    }
                    for (var z = 0; z < oAArr.length; z++) {
                        var obj = response.data[z];
                        oAArr[z].href = "detail.html?goods_id="+ obj.goods_id;
                        oImgArr[z].src = obj.goods_thumb;
                        oHArr[z].innerText = obj.goods_desc;
                        oPArr[z].innerText = obj.goods_name;
                        priceArr[z].innerText = "￥" + obj.price;
                    }
                    }
            })
        }
});
//底部设置
var login = document.getElementById("login");
if (localStorage.getItem('token')){
    login.innerText = (localStorage.getItem('username'));
} else  {
    login.innerText = "登录";
}
login.onclick = function () {
    if (!localStorage.token) {
        location.href = 'login.html#callbackurl='+location.href;
        return;
    }
}



