//设置顶部行高
new LineHeight();
$(window).resize(function (){
    new LineHeight();
})
function LineHeight() {
    var offHeight = document.getElementById("callback").offsetHeight;
    var callBack = document.getElementById("callback");
    callBack.style.lineHeight = offHeight+"px";
    $(".search-warp").css("line-height",offHeight+"px");
    $(".btn-warp").css("line-height",offHeight+"px");
}
//搜索框
var search = document.getElementById("search");
search.onfocus = function () {
    document.onkeydown = function (event) {
        event = event || window.event;
        if ( event.keyCode === 13) {
            var searchVal = search.value;
            location.href = "search.html?search_text="+searchVal;
        }
    }
}
//搜索按钮点击事件
var searchBtn = document.getElementsByClassName("search-btn")[0];
    searchBtn.onclick = function () {
        var searchVal = search.value;
        location.href = "search.html?search_text="+searchVal;
    }
var search_text = $.getQueryString('search_text');
    console.log(search_text);
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_goods.php?pagesize=20&search_text=" +search_text,
    "type": "get",
    "dataType": "JSON",
    "success": function(response) {
        if (response.code === 1) {
            $(".shop-list-content").css("display","none");
            $("#shop-list-warp").append("<div class ='friendly-reminder'"+">"+"抱歉，没有搜到与"+search_text+"的商品"+"</div>")
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
    // var cat_id = GetQueryString("id");
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var scrollTop = document.body.scrollTop;
    if ((documentHeight - windowHeight) === scrollTop) {
        page ++;
        if(page > 10) {
            return;
        }
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_goods.php?&page="+page,
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

document.onscroll = function () {
    var windowHeight = $(window).height();
    var scrollTop = document.body.scrollTop;
    if (scrollTop >= windowHeight) {
        $("#back-to-top").css("opacity",1);
        $("#back-to-top").click(function () {
            $('html,body').animate({scrollTop: '0px'}, 800);
            $("#back-to-top").css("opacity",0);
        })
    } else {
        $("#back-to-top").css("opacity",0);
        document.body.scrollTop = scrollTop;
    }
    console.log(windowHeight);
    console.log(scrollTop);
}

