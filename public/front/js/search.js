$(function(){
  // var arr =['1','2','3'];
  // str = JSON.stringify(arr);
  // //console.log(str);
  // localStorage.setItem('search_lt_history',str);
  render();
  // var obj = {list:getHistory()}
  $('.search_con').on('click','.clear_btn',function(){
    mui.confirm('你确定要清空搜索历史记录吗？','温馨提示',['是','否'],function(e){
      // console.log(e)
      if(e.index===0){
        localStorage.removeItem('search_lt_history');
        render();
      }
    })
    
  });
  $('.search_con').on('click','.search_del',function(){
    var data = $(this).data('history');

    mui.confirm('你确定要清空搜索历史记录吗？','温馨提示',['是','否'],function(e){     
      if(e.index===0){
        var arr = getHistory();
        data =data.toString();
        var index = arr.indexOf(data);
        arr.splice(index,1);
        arr=JSON.stringify(arr);
        localStorage.setItem('search_lt_history',arr);
        render();
      }
    })
  
    
  });
//添加
$('.search_title button').on('click',function(){
  var txt = $('.search_title input').val().trim();
  $('.search_title input').val('');
  if(txt){
    var arr = getHistory();
  var index = arr.indexOf(txt);
  if(index!=-1){
    arr.splice(index,1);
  };
  if(arr.length>=10){
    arr.pop();
  }
  arr.unshift(txt);
  arr= JSON.stringify(arr);
  localStorage.setItem('search_lt_history',arr);
  render();
  location.href ='searchList.html?key='+txt;
  }else{
    mui.toast('搜索内容不能为空',{ duration:'1000ms', type:'div' }) 
  }
  
});
  function  getHistory(){
   var history = localStorage.getItem('search_lt_history') ;
    history = JSON.parse(history) || [];
    return history;
  }

function render(){
  var arr = getHistory();
  $('.search_con').html(template('searchTpl',{list:arr}));
}
  
});