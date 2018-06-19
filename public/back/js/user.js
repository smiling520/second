$(function(){
    var page = 1;
    var pageSize = 8;
    render();
    function render(){
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            dataType:'json',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function(info){
                console.log(info);
                $('#user_tb').html(template('userTpl',info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    size:'small',
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function(a,b,c,p){
                        page = p;
                        render();
                    }
                });
            }
        });
    }

    // 启用禁用事件
    $('#user_tb').on('click','.btn', function(){
        $('.user_modal').modal('show');
        var id = $(this).parent('td').data('id');
        console.log(id);
        var that  =this;
     $('.user_out').off().on('click',function(){
        if($(that).hasClass('btn-success')){
            var isDelete = 1;
        }else{
            isDelete = 0;
        };
        $.ajax({
            type:'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function(e){
                if(e.success){
                    $('.user_modal').modal('hide');
                    render();
                };
            }
        });
     });
    });
 
});