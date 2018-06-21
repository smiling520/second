$(function () {
    var page = 1;
    var pageSize = 2;
    var imgs =[];
    render();
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('#product_tb').html(template('productTpl', info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    size: 'small',
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    itemTexts: function (type, page, current) {
                        //console.log(type, page, current);
                        switch (type) {
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return page;
                        }
                    },
                    onPageClicked: function(a,b,c,p){
                        page=p;
                        render();
                    }
                });
            }
        });
    }

//要学会循环使用之前的接口
    $('.product_add').on('click',function(){
        $('.product_modal').modal('show');
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data:{
                page:1,
                pageSize:100
            },
            success: function(info){
                $('.product_dropmenu').html(template('addTpl',info));
            }
        });
    });
    $('.product_dropmenu').on('click','a',function(){
        var txt =$(this).text();
        $('.productSel').text(txt);
        var id =$(this).data('id');
        // console.log(id);     
        $('.brandId').val(id);
       $('.product_form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });
    
    // 上传图片
    $('#fileupload').fileupload({
        done:function (e, dat) {
            var count = imgs.length +1;
            $('.upload_img').append('<img src="'+ dat.result.picAddr+'" alt="" width="100"> ');       
            imgs.push('picName'+count+'='+dat.result.picName+'&picAddr'+(count)+'='+dat.result.picAddr+'');
            if(imgs.length==3){
                $('.product_form').data('bootstrapValidator').updateStatus('pic2','VALID');
            }else {
                $('.product_form').data('bootstrapValidator').updateStatus('pic2','INVALID');
            }
        }
    });

    //表单校验
    $('.product_form').bootstrapValidator({
        excluded:[],
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类'
                    }
                }

            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }

            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品介绍'
                    }
                }

            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    regexp:{
                        regexp:/^[1-9]\d{0,4}/,
                        message:'请输入商品库存（1-99999）'
                    }
                }

            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入商品尺寸'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}/,
                        message:'请输入商品正确的尺寸（如30-50）'
                    }
                }

            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }

            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品现价'
                    }
                }
            },
            pic2:{
                validators:{
                    notEmpty:{
                        message:'请上传三张图片'
                    },            
                }
            }         
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }

    });

    $('.product_form').on('success.form.bv',function(e){
        e.preventDefault();
        var dataStr = ($('.product_form').serialize()) +'&'+imgs.join('&');
        // console.log(dataStr);
        $.ajax({
            url: '/product/addProduct',
            data: dataStr,
            type:'post',
            success: function(info){
                console.log(info);
                $('.product_modal').modal('hide');
                if(info.success){
                    page=1;
                    render();
                    imgs=[];
                    $('.product_form').data('bootstrapValidator').resetForm(true);
                    $('.productSel').text('请选择二级分类');
                    $('.upload_img').empty();
                }
                
            }
        });
        //console.log(imgs);
    });
});