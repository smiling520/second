$(function () {
  renderFirst();

  function renderFirst() {
    $.ajax({
      url: '/category/queryTopCategory',
      type: 'get',
      success: function (info) {
       // console.log(info);
        //console.log(info.rows[0].id);
        $('.first_left ul').html(template('firstTpl', info));
        renderSecond(info.rows[0].id);
      }
    });
  }

$('.first_left').on('click','li',function(){
 var id =$(this).data('id');
  //console.log('hh');
  $(this).addClass('current').siblings().removeClass('current');
  mui('.second_right .mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
  //console.log($(this).data('id'));
  // $(this).addClass('current').siblings().removeClass('current');
  renderSecond(id);
});

  //renderSecond(id);

  function renderSecond(id) {
    $.ajax({
      data:{
        id: id
      },
      url: '/category/querySecondCategory',
      type: 'get',
      dataType: 'json',
      success: function (info) {
        //console.log('ggg');
        //console.log(info);
        $('.second_right ul').html(template('secondTpl', info));

      }
    });

  }

})