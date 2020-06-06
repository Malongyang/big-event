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
                //提示层
                layer.msg(back.message);
                // alert(back.message);
                if (back.status === 0) {
                    $('#register').hide().prev().show();
                }
            }
        })
    });


    // 注册登录页面
    $('#login form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 获取用户名和密码
        var data = $(this).serialize();
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: data,
            success: function (back) {
                //提示层
                layer.msg(back.message);
                // alert(back.message);
                if (back.status === 0) {
                    // 保存令牌token
                    localStorage.setItem('token', back.token);
                    //调转到index.html
                    location.href = '/index.html'
                }

            }
        })
    });

    // 表单验证

    // 加载form模块
    var form = layui.form;
    // 调用form.verify()方法
    form.verify({
        len: [/^[\S]{6,12}$/, '密码长度不对'],
        // len: function (val) {
        //     if (val.trim().length < 6 || val.trim().length > 12) {
        //         return "密码不对"
        //     }
        // }
    })
})