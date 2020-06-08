$(function () {
    // 1.发送ajax请求获取用户信息

    getUserInfo();

    //注册点击退出登录按钮事件
    $('#log_out').on('click', function () {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //清除token值
            localStorage.removeItem('token');
            //返回到登录页面
            location.href = '/login.html';
            //关闭提示层
            layer.close(index);
        });
    })


})

//设置全局函数发送ajax请求,设置全局函数的原因是后面其他页面要调用
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: function (back) {
            if (back.status === 0) {
                //设置欢迎语有昵称用昵称没有昵称用用户名
                var userInfo = back.data.nickname || back.data.username;
                $('.userInfo').text(userInfo);
                //判断是否有用户头像
                if (back.data.user_pic === null) {
                    //隐藏图像使用用户首字母
                    var t = userInfo.substr(0, 1).toUpperCase();
                    $('.layui-nav-img').hide();
                    //jquery的show会让元素为行内元素,为了不影响页面布局需要设置为行内块
                    $('span.userPhoto').text(t).css('display', 'inline-block');
                } else {
                    //隐藏用户首字母,使用用户头像
                    $('.userPhoto').hide();
                    $('.layui-nav-img').attr('src', back.data.user_pic).show();
                };
            };
        },
        // 防止设置假token值,进入index页面,
        //页面加载完毕必须会执行的函数体
        complete: function (xhr) {
            if (xhr.responseJSON.status === 1 || xhr.responseJSON.message === '身份认证失败! ') {
                //清除token值
                localStorage.removeItem('token');
                //返回到登录页面
                location.href = '/login.html';
            }

        }
    });
}