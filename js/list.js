
$.getQueryString= function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
var cat_id = $.getQueryString('cat_id');
$.ajax({
    "url":'http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id,
    "type":"GET",
    "dataType":"json",
    "success":function (response) {
        if(response.data.length === 0){
            var oH3 = document.createElement('h3');
                oH3.innerText = '暂无商品';
            document.body.appendChild(oH3);
            return;
        }
        for(var i = 0; i < response.data.length; i++){
            $(".shop-list").append('<li><a class="shops" href="detail.html?goods_id='
                + response.data[i].goods_id
                +'"><img src="'
                + response.data[i].goods_thumb+'" alt="">'
                +'<p>'
                +response.data[i].goods_name
                +'</p>'
                +'<em>'
                + '￥'+ response.data[i].price
                +'</em></a></li>');
            console.log(response.data[i]);
        }
    }
});

