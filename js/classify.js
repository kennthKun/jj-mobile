
$.ajax({
    "url":'http://h6.duchengjiu.top/shop/api_cat.php',
    "type":"GET",
    "dataType":"json",
    "success":function (response) {
        for(var i = 0; i < response.data.length; i++){
            $(".classify-item").eq(i).append("<a class='layer' href='list.html?cat_id=" + response.data[i].cat_id +"'>"+response.data[i].cat_name+"</a>")
            console.log(response.data[i].cat_name);
        }

    }
});
