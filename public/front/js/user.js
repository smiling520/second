$(function(){
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function(info){
      console.log(info);
      if(info.error){
        location.href='login.html';
      }
      $('.userInfo').html(template('userTpl',info));
    }
  })
  $('.login_out button').on('click',function(){
    $.ajax({
      url:'/user/logout',
      type:'get',
      success:function(info){
        if(info.success){
          location.href='login.html';
        }
      }
    });
  });
})