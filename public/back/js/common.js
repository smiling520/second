$(function () {
    NProgress.start();
    if (location.href.indexOf('login.html') == -1) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            success: function (info) {               
                if (info.error == 400) {
                    location.href = 'login.html';

                };
                NProgress.done(); 
            }
        });
    }

    $('.sort>a').on('click', function () {
        $('.sort_list').slideToggle();
    });
    $('.userinfo').on('click', function () {
        $('.homeleft').toggleClass('now');
        $('.homeRight').toggleClass('now');

    });

    //退出登录
    $('.login_out').on('click', function () {
        $('.login_out_modal').modal('show');
        $('.user_login_out').off().on('click', function () {
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                success: function (info) {
                    console.log(info);
                    if (info.success) {
                        $('.login_out_modal').modal('hide');
                        location.href = 'login.html';
                    }
                }
            });
        });
    });
    $('.manage_list a').on('click',function(){
        $('.manage_list a').removeClass('current');
        $(this).addClass('current');
    });
})