var navRight = document.getElementById("nav-right");
navRight.onclick = function() {
    $("#ul-fold").toggle();
};
var goods_id = $.getQueryString('goods_id');
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+goods_id,
    "type": "get",
    "dataType": "JSON",
    "success": function (response) {
            var obj = response.data[0];
            $("#shop-setails").append('<img src="'+ obj.goods_thumb +'"/>');
            $("#shop-bottom").append('<p>'+obj.goods_name+'</p><span>'+obj.goods_desc+'</span><em>¥：'+obj.price+'</em>');
            $("#restss").append('<span><i>已选择：</i>'+obj.goods_name+'</span>');
        }
});
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_goods.php?pagesize=100 ",
    "type": "get",
    "dataType": "JSON",
    "success": function (response) {
        console.log(response);
        var num = parseInt(Math.floor(Math.random()*85+1));
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            if(i>num) {
                $("#drs-shops").append('<div class="drs-shops"><a href="detail.html?goods_id='+obj.goods_id+'"><img src="'+ obj.goods_thumb +'" /><span>'+obj.goods_name+'</span><br/><p>'+obj.goods_desc+'</p></a></div>');
            }
        }
    }
});
$("#add-to-cart").click(function(){
	if (!localStorage.token) {
        location.href = 'login.html#callbackurl='+location.href;
        return;
   }
	$.ajax({
	        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
	        "type": "POST",
	        "data": {
	            "goods_id": goods_id
	        },
	        "dataType": "json",
	        "success": function(response) {}
	});
});