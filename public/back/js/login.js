$(function () {

    $(document).on('ready', function () {
        $('.login_form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {

                username: {
                    trigger: 'keyup',
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 4,
                            max: 12,
                            message: '用户名长度必须在4到12之间'
                        },
                        callback: {
                            message: '用户名错误'
                        }

                    }
                },
                password: {
                    trigger: 'keyup',
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: '密码长度必须在6到12之间'
                        },
                        callback: {
                            message: '密码错误'
                        }


                    }
                }
            },

        });
    });
    $('.login_form').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('.login_form').serialize(),
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = 'index.html';
                };
                console.log(info);
                if (info.error == 1000) {
                    $(".login_form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                };
                if (info.error == 1001) {
                    $(".login_form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                };
            }

        });
    });
    $('.resetBtn').on('click',function(){
        console.log('hh');
        $(".login_form").data('bootstrapValidator').resetForm();
    });

   
    
})