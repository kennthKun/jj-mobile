//
// $.getQueryString= function(name) {
//     var search = location.search.substr(1);
//     var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
//     var r = search.match(reg);
//     if (r === null) return null;
//     return decodeURI(r[2]);
// };
// var cat_id = $.getQueryString('cat_id');
// $.ajax({
//     "url":'http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id,
//     "type":"GET",
//     "dataType":"json",
//     "success":function (response) {
//         if(response.data.length === 0){
//             var oH3 = document.createElement('h3');
//             oH3.innerText = '暂无商品';
//             document.body.appendChild(oH3);
//             return;
//         }
//         for(var i = 0; i < 4; i++){
//             // $(".carousel-shop").append('<li class="cur"><a class="shops" href="detail.html?goods_id='
//             //     + response.data[i].goods_id
//             //     +'"><img src="'
//             //     + response.data[i].goods_thumb+'" alt=""></a></li>');
//             console.log(response.data[i]);
//
//         }
//     }
// });



shop.api.fetchHotGoods(function(response){
    var obj = response.data;
    console.log(obj);
    for (var j = 0; j < 9; j++) {
        $(".goods-hot").append('<div class="item"><a href="detail.html?goods_id=' +obj[j].goods_id+ '">' +
            '<img src="' + obj[j].goods_thumb + '"><div class="desc">'
            + obj[j].goods_name+'</div><div class="price">'+ "￥" + obj[j].price +'</div></a></div>');
    }
});

window.onload = function(){
    var carousel = document.querySelector('#carousel');
    var imageLis = document.querySelectorAll('#carousel .imagesList li');
    var circleLis = document.querySelectorAll('#circles ul li');
    console.log(imageLis);
    var circleLis = document.querySelectorAll('#circles ul li');
    console.log(imageLis);
    var circleLis = document.querySelectorAll('#circles ul li');
    var circleLis = document.querySelectorAll('#circles ul li');


    var idx = 0;//当前中间图片
    var next = 1;//下一张图
    var prev = imageLis.length - 1;//上一张
    var timer = setInterval(function(){
        showNext();
    }, 3000);
    //批量给小圆点绑定touch事件
    for (var i = 0; i < circleLis.length; i++) {
        (function(i){
            circleLis[i].addEventListener('touchstart', function(){
                clearInterval(timer);
                setCurrentImage(i);//设置当前应该显示第几张
            }, false);
        })(i);
    }
    function setCurrentImage(_idx) {
        idx = _idx;
        prev = idx - 1;
        if (prev === -1) {
            prev = imageLis.length - 1;
        }
        next = idx + 1;
        if (next > imageLis.length - 1) {
            next = 0;
        }

        init(); //设置一下当前的图片合适的位置和小圆点合适的位置

        clearInterval(timer);
        timer = setInterval(function(){
            showNext();
        }, 3000);
    }


    var windowWidth;
    init();
    window.onresize = init;

    function init() {
        windowWidth = document.documentElement.clientWidth;
        var carouselHeight = windowWidth/(414/250)
        if(carouselHeight>216){
        	carouselHeight = 216;
        }
//      else if(carouselHeight<117){
//      	carouselHeight = 117;
//      }
        carousel.style.height =  carouselHeight + 'px';

        for (var i = 0; i < imageLis.length; i++) {
            imageLis[i].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        }

        changepic();
        setPoint();
    }

    //事件监听
    carousel.addEventListener('touchstart', touchstartHandler, false);
    carousel.addEventListener('touchmove', touchmoveHandler, false);
    carousel.addEventListener('touchend', touchendHandler, false);

    var startX, startTime;
    function touchstartHandler(event) {
        event.preventDefault();
        clearInterval(timer);
        //记录偏移值
        startX = event.touches[0].clientX;
        console.log(startX);
        //记录时间戳
        startTime = new Date();
        console.log(startTime);
        imageLis[prev].style.transition = "none";
        imageLis[idx].style.transition = "none";
        imageLis[next].style.transition = "none";
    }
    function touchmoveHandler (event) {
        event.preventDefault();
        //得到坐标x
        var clientX = event.touches[0].clientX;
        console.log(clientX - startX);
        //改变图片的位置
        imageLis[idx].style.webkitTransform = "translateX(" + (clientX - startX) + 'px)';
        imageLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - startX)) + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + (-windowWidth + (clientX - startX)) + 'px)';
    }
    function touchendHandler(event) {
        event.preventDefault();
        //判断滑动是否成功
        var distance = event.changedTouches[0].clientX - startX;
        console.log(distance);
        var time = new Date() - startTime;
        console.log(time);

        if (distance >= windowWidth || (distance > 30 && time < 300)) {
            showPrev();
        } else if (distance <= -windowWidth || (distance < -30 && time < 300)) {
            showNext();
        } else {
            //绝对值不到windowWidth/2
            console.log('不成功');

            //移动
            imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
            imageLis[idx].style.webkitTransform = "translateX(0px)";
            imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

            imageLis[prev].style.transition = "all 0.3s ease 0s";
            imageLis[next].style.transition = "all 0.3s ease 0s";
            imageLis[idx].style.transition = "all 0.3s ease 0s";
        }

        clearInterval(timer);
        timer = setInterval(function(){
            showNext();
        }, 3000);
    }

    function showPrev() {
        next = idx;
        idx = prev;
        prev--;
        if (prev < 0) {
            prev = imageLis.length - 1;
        }
        changepic();
        setPoint();
        imageLis[prev].style.transition = "none";
        imageLis[next].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
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
        changepic();
        setPoint();
        imageLis[prev].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
        imageLis[next].style.transition = "none";
    }
    function changepic() {
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
    }
    function setPoint() {
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = '';
        }
        circleLis[idx].className = 'cur';
    }
}
