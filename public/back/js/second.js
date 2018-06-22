$(function(){
    var page =1;
    var pageSize = 8;
    render();
    function render(){
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
               // console.log(info);
                $('#second_tb').html(template('secondTpl',info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    size: 'small',
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function(a,b,c,p){
                        page=p;
                        render();
                    }
                });
            }
        });
    }
    
    $('.second_add').on('click',function(){
        $('.second_modal').modal('show');
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info){
                console.log(info);
              $('.second_dropmenu').html(template('addTpl',info));
             
               
            }
        });
    });
    $('.second_dropmenu').on('click','a',function(){
        var id = $(this).data('id');
        var content = $(this).text();
        $('.dropdown .firstSel').text(content);
        $('.categoryId').val(id);
        $('.second_form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    });
   $("#fileupload").fileupload({
       dataType:'json',
       done:function (e, data) {
           $('.upload_img img').attr('src',data.result.picAddr?data.result.picAddr:'images/none.png');
           $('.brandLogo').val(data.result.picAddr?data.result.picAddr:'images/none.png');
           $('.second_form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
      }
   });
   //表单校验
   $('.second_form').bootstrapValidator({
    excluded: [],  
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryId: {
            validators: {
                notEmpty: {
                    message:'不能为空',
                }
            }
        },
        brandName: {
            validators: {
                notEmpty: {
                    message:'不能为空',
                }
            }
        },
        brandLogo: {
            validators: {
                notEmpty: {
                    message:'不能为空',
                }
            }
        }
      }
   });
   $('.second_form').on('success.form..bv',function(e){
       e.preventDefault();
       $.ajax({
           type:'post',
           url:'/category/addSecondCategory',
           dataType: 'json',
           data:$('.second_form').serialize(),
           success: function(info){
                console.log(info);
                if(info.success){
                    $('.second_modal').modal('hide');
                    page=1;
                    render();
                    $('.second_form').data('bootstrapValidator').resetForm(true);
                    $('.firstSel').text('请选择一级分类');
                    $('.upload_img img').attr('src','images/none.png');
                }
           }
       });
   });
    
});