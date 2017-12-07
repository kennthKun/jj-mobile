var searchText = $.getQueryString('search_text');
$("#search-text").val(searchText);

searchGoods();
//调用搜索商品接口
function searchGoods (){
    shop.api.searchGoods({
        "search_text": searchText,
        "page": 1,
        "pagesize": 10,
        "callback": function(response) {
            console.log(response);
            var obj =  response.data;
            for (var j = 0; j < obj.length; j++) {
                $(".goods-hot").append('<div class="item"><a href="detail.html?goods_id=' +obj[j].goods_id+ '">' +
                    '<img src="' + obj[j].goods_thumb + '"><div class="desc">'
                    + obj[j].goods_name+'</div><div class="price">￥'+ obj[j].price +'</div></a></div>');
            }
        }
    });
}