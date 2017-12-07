$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem('token'),
    "type": "get",
    "dataType": "JSON",
    "success": function (response) {
    	console.log(response);
            for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
                $("#shopping-box").append('<div class="shopping-shop"><input type="checkbox" name="check_box" checked/><img src="'+obj.goods_thumb+'"><p>'+ obj.goods_name +'</p><em>¥：'+obj.goods_price+'</em><span>独享价</span><div class="number"><input type="number" class="numbers"/><span class="glyphicon glyphicon-trash"></span></div></div>');
        }
        }
});
var a = document.getElementById("check-all");  
var b = document.getElementsByName("check_box");  
$("#check-all").click(function(){  
    if(a.checked){  
        for(var i = 0; i < b.length; i++){  
            b[i].checked = true;  
        }  
    }else{  
        for(var i = 0; i < b.length; i++){  
            b[i].checked = false;  
        }  
    }  
});
var arr = [];
for (k in b) {
	var str = k +"="+b[k];
	arr.push(str);
	
}
console.log(arr);
//for (var j = 0; j < b.length; j ++) {
//	b[j].onclick = function() {
////		if (this.checked == false) {
////			console.log(a);
////		}	
//	}
	console.log(b);
//}
//单选框  
//$("input[name='check_box']").click(function(){  
//  for(var i = 0; i < b.length; i++){  
//      if(b[i].checked = false){  
//      		console.log(1);
//          a.checked = false;  
//          break;  
//      }  
//  }  
//  a.checked = true;  
//});  
//总价
var dunitCost = document.getElementsByTagName("em");
var numbers = document.getElementsByClassName("numbers");
console.log(numbers);
function total() {
	
}
