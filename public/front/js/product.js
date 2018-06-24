$(function () {
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: getArgument().proId
    },
    type: 'get',
    success: function (info) {
      $('.mui-scroll').html(template('proTpl', info));
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui('.mui-numbox').numbox();
      $('.size span').on('click', function () {
        $(this).addClass('current').siblings().removeClass('current');
      });
      $('.product_footer .goCart').on('click', function () {
        $.ajax({
          data: {
            productId: getArgument().proId,
            num: $('.numVal').val(),
            size: $('.size span.current').text()
          },
          url: '/cart/addCart',
          type: 'post',
          success: function (info) {
            console.log(info)
            if (info.error) {
              location.href = 'login.html?rUrl='+location.href;
            };
            if (info.success) {
              
              location.href = 'cart.html';
            }
          }
        });
      });
    }
  });


  console.log(getArgument().proId);
  function getArgument() {
    //获取URL传递的参数存放到对象中 参数为?k=1&m=2&n=3 转化成obj={k:1,m:2,n:3}的形式
    var str = location.search;
    //转义中文
    str = decodeURI(str);
    // str ='?k=1&m=2&n=3';
    //去掉问号
    str = str.slice(1);
    // console.log(str);
    var arr = str.split('&');
    var obj = {};
    arr.forEach(function (e, i) {
      e = e.split('=');
      obj[e[0]] = e[1];
    });
    return obj;
  }
})