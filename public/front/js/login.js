$(function(){
  $('.login_btn').on('click',function(){
    var uname =$('.username').val();
    var pwd = $('.password').val(); 
    if(uname==''){
      mui.toast('用户名不能为空');
      return;
    };
    if(pwd==''){
      mui.toast('密码不能为空');
      return;
    };
    $.ajax({
      url:'/user/login',
      data:$('.mui-input-group').serialize(),
      type:'post',
      success:function(info){
        console.log(info);
        if(info.error){
          mui.toast(info.message);
          
        };
        if(info.success){
          var str = location.search;
          //转义中文
          str=decodeURI(str);
          str =str.slice(6);
          location.href = location.href.indexOf('rUrl')==-1?'user.html':str;
        }
      }
    });
  });
})