$.getQueryString= function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};

var goods_id = $.getQueryString('goods_id');
console.log(goods_id);
$.ajax({
   "url":'http://h6.duchengjiu.top/shop/api_goods.php?goods_id='+ goods_id,
    "type":"GET",
    "dataType":"json",
    "success":function (response) {
           $('.carousel-img').append('<img src="'+ response.data[0].goods_thumb +'" alt="">');
          $('.shop-pic').append('<img src="'+ response.data[0].goods_thumb +'" alt="">');


          $(".shop-introduction").append('<p>'+ response.data[0].goods_name +'</p><em>'+"￥"+response.data[0].price+'</em>');
          $('.number').append('<input class="input1" type="button" value=" - "/><input class="input2" value="'+1 +'"><input class="input3" type="button" value="+">');
           console.log(response.data[0]);
    }
});
$('#addCart').click(function () {
    if(!localStorage.token) {
        location.assign('register.html#callbackurl=' + location.href);
        // location.href = 'register.html#callbackurl='+location.href;
        return;
    }
    console.log('已登录');
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
        "type":'POST',
        "data":{
            "goods_id":goods_id,
            "number":1
        },
        "dataType":"json",
        "success":function (response) {
            console.log(response);
        }
    });
    location.assign("cart.html")
});










window.onload = function () {
    var carousel = document.querySelector(".detail-content");
    var imageLis = document.querySelectorAll(".detail-content li");
    var circleLis = document.querySelectorAll('#circles li');

    var idx = 0;//当前中间图片
    var next = 1;//下一张图
    var prev = imageLis.length - 1;//上一张

    var windowWidth;

    //初始化
    init();

    //屏幕尺寸改变重新执行初始化
    window.onresize = init;

    function init() {
        //屏幕的宽度
        windowWidth = document.documentElement.clientWidth;

        // 图片的宽度414       窗口的宽度(图片的动态宽度)
        // _________   =    ________
        // 图片的高度313        动态的图片的高度
        //设置盒子的高度
        carousel.style.height =  windowWidth / (414 / 313) + 'px';

        //设置li的默认位置
        for (var i = 0; i < imageLis.length; i++) {
            imageLis[i].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        }

        //新的位置
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

        //去掉过渡，移动的时候我们希望实时跟随鼠标，而不是有过渡效果
        imageLis[prev].style.transition = "none";
        imageLis[idx].style.transition = "none";
        imageLis[next].style.transition = "none";
    }

    //事件监听
    carousel.addEventListener('touchstart', touchstartHandler, false);
    carousel.addEventListener('touchmove', touchmoveHandler, false);
    carousel.addEventListener('touchend', touchendHandler, false);

    var deltaX, startX, startTime;
    function touchstartHandler(event) {
        //阻止默认行为
        event.preventDefault();
        //手指个数
        if (event.touches.length > 1) {
            return;
        }

        //记录偏移值
        deltaX = event.touches[0].clientX;
        startX = event.touches[0].clientX;
        //去掉过渡效果
        imageLis[prev].style.transition = "none";
        imageLis[idx].style.transition = "none";
        imageLis[next].style.transition = "none";
        //记录时间戳
        startTime = new Date();
    }
    //手指移动的时候
    function touchmoveHandler (event) {
        //阻止默认事件
        event.preventDefault();
        //手指个数
        if (event.touches.length > 1) return;

        //得到坐标x
        var clientX = event.touches[0].clientX;
        //改变图片的位置
        imageLis[idx].style.webkitTransform = "translateX(" + (clientX - deltaX) + 'px)';
        imageLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - deltaX)) + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + (-windowWidth + (clientX - deltaX)) + 'px)';
    }
    //触摸结束事件
    function touchendHandler(event) {
        console.log(event);
        event.preventDefault();
        //判断滑动是否成功
        var distance = event.changedTouches[0].clientX - startX;
        //滑动的时间
        var time = new Date() - startTime;

        //如果你向右边滑动超过了屏幕的一半，或者向右滑动时间小于300毫秒，距离大于30px则认为滑动成功
        if (distance >= windowWidth/2 || (distance > 30 && time < 300)) {
            //向右滑动成功
            console.log('向右滑动成功');
            //先改变信号量
            next = idx;
            idx = prev;
            prev--;
            if (prev < 0) {
                prev = imageLis.length - 1;
            }

            //加上过渡
            imageLis[idx].style.transition = "all 0.3s ease 0s";
            imageLis[next].style.transition = "all 0.3s ease 0s";
            //移动
            imageLis[idx].style.webkitTransform = "translateX(0px)";
            imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        } else if (distance <= -windowWidth/2 || (distance < -30 && time < 300)) {
            showNext();
        } else {
            //绝对值不到windowWidth/2
            console.log('不成功');

            //加上过渡
            imageLis[prev].style.transition = "all 0.3s ease 0s";
            imageLis[idx].style.transition = "all 0.3s ease 0s";
            imageLis[next].style.transition = "all 0.3s ease 0s";

            //移动
            imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
            imageLis[idx].style.webkitTransform = "translateX(0px)";
            imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        }
    }

    function showNext() {
        console.log('向左滑动成功');
        //先改变信号量
        prev = idx;
        idx = next;
        next++;
        if (next > imageLis.length - 1) {
            next = 0;
        }

        imageLis[next].style.transition = "none";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

        //加上过渡
        imageLis[prev].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
        //移动
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
        imageLis[idx].style.webkitTransform = "translateX(0px)";

    }
};


// $(".detail-content a").click(function (event) {
//     event.stopPropagation();
//     $(".shop-pic").show();
// });
// $(".shop-pic").click(function () {
//     $(".shop-pic").hide();
// });
