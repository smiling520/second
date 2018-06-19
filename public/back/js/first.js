$(function(){
    var page =1;
    var pageSize = 8;
    render();
    function render(){
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
               // console.log(info);
                $('#first_tb').html(template('firstTpl',info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    size: 'small',
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

    //添加分类
    $('.first_add').on('click',function(){
        $('.first_modal').modal('show');
      
    });
    $('.first_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类不能为空'
                    }
                }
            }
          }
    });
     $('.first_form').on('success.form.bv',function(e){
         e.preventDefault();
         $.ajax({
             type: 'post',
             url: '/category/addTopCategory',
             data: $('.first_form').serialize(),
             success:function(info){
                 if(info.success){
                    $('.first_modal').modal('hide');
                    page=1;
                    render();
                    $('.first_form').data('bootstrapValidator').resetForm(true);
                 }
             }
         });
     });
    
});