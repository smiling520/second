$(function(){
  var page=1;
  var pageSize =3;
  var content = getArgument();
  $('.search_title input').val(content.key);
  setTimeout(function(){

  },5000);
  //渲染商品
  //render();
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {    
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback :function(){
          page=1;
          render(function(info){
            console.log(info);
            $('.list_desc .product').html(template('listTpl',info));
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
            if(info.data.length==0){
              $('.list_desc .product').html('<p>该商品暂未上架</p>');
            }
          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up :{
        callback :function(){

            page++;
            render(function(info){
              $('.list_desc .product').append(template('listTpl',info));
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length==0);
        
            });                
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  //点击搜索
  $('.search_title button').on('click',function(){
    $('.list_sort li').removeClass('current')
    $('.list_sort li').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
   
  });

$('.list_sort li[data-type]').on('tap',function(){
  if($(this).hasClass('current')){
    $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
  }else{
    $(this).addClass('current').siblings().removeClass('current').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

  }
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
});


  function render(fn){
    // $('.product').html('  <p class="loading"></p>');
    var txt = $('.search_title input').val();
    var $li = $('.list_sort li.current');
    var obj = {
      page: page,
      pageSize: pageSize,
      proName: txt
    };
    if($li.length!=0){
      var type =$li.data('type');
      if($li.find('span').hasClass('fa-angle-up')){
        obj[type]=1;
       }else{
        obj[type]=2;
      }
    }

    $.ajax({
      url: '/product/queryProduct',
      data:obj,
      type: 'get',
      success: function(info){  
        setTimeout(function(){
          fn(info);        
        },1000);
      }
    });
  }


  function getArgument(){
    //获取URL传递的参数存放到对象中 参数为?k=1&m=2&n=3 转化成obj={k:1,m:2,n:3}的形式
   var str = location.search;
   //转义中文
   str=decodeURI(str);
   // str ='?k=1&m=2&n=3';
    //去掉问号
   str = str.slice(1);
   // console.log(str);
   var arr = str.split('&');
   var obj={};
   arr.forEach(function(e,i){
     e=e.split('=');
     obj[e[0]]=e[1];
   });
   return obj;
 }
 
})