$(function () {
    var username = getCookie('username');
    var userphone = getCookie('userphone');

    //点击返回
    $('.goBack').on('click', function () {
        window.location.href = './index.html';
    });
    //选择日期
    $('.navInfo').on('click', function () {
        $('.dateMenu').slideDown();
    });
    data('1');
    $('.dateMenu').on('click', 'li', function () {
        var time;
        $('.navInfo').text($(this).text());
        $('.dateMenu').slideUp();
        //alert('读数据库')
        switch ($(this).text()) {
            case '本月日程':
                time = '2';
                break;
            case '本年日程':
                time = '0';
                break;
            default:
                //今日日程
                time = '1';
        }
        data(time);

    });

    function data(time) {
        fetch(hostUrl + '/api/findScheduleListByAttr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: userphone, timeDian: time // '1':当日  ，'2'：本月 ，'0':本年
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res);
            var dom = '';
            if (res.length) {
                $(res)
                    .each(function () {
                        dom += ' <li id=' + this._id + '><p class="L-name">' + this.title + '</p><p class = "doThingsTime" ><span class="fromTime">' + this.startTime.substring(0, 16) + '</span><span> -- </span><span class = "toTime" > ' + this.endTime.substring(0, 16) + '</span></p></li>';
                    });
                $('.mainList').removeClass('on');
            } else {
                $('.mainList').addClass('on');
            }
            $('#list')
                .html('')
                .append(dom);
        })
    }
    $('.mainList')
        .on('click', 'li', function () {
            window.location.href = './listinfo.html?id=' + this.id;
        });
})