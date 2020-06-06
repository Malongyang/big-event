$(function () {
    // 1.点击去注册按钮事件
    $('#login .go_reg').on('click', function () {
        $('#login').hide().next().show();
    });
    $('#register .go_login').on('click', function () {
        $('#register').hide().prev().show();
    });


    // 注册事件监听form表单事件
    $('#register form').on('submit', function (e) {
        //    1.阻止默认提交行为
        e.preventDefault();
        // 2.获取用户名和密码
        var data = $(this).serialize();
        console.log(data);

        // 3.发送ajax请求
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: function (back) {
                alert(back.message);
                if (back.status === 0) {
                    $('#register').hide().prev().show();
                }
            }
        })
    })

})