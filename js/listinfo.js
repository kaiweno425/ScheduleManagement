$(function () {

    $('.back')
        .on('click', function () {
            window.location.href = './index.html';
        });

    $('.editer').on('click', function () {
        window.location.href = './creatWork.html?id=' + window
            .location
            .search
            .split('=')[1];
    });
    $('.delecter').on('click', function () {
        delect();
    });

    //显示日程详细信息
    (function () {
        var id = window
            .location
            .search
            .split('=')[1];
        fetch(hostUrl + '/api/findScheduleByAttr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({attr: "_id", val: id})
        }).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res);
            $('.scheduleName span').html(res.title);
            $('.scheduleTime span').html(res.startTime.substring(0,16) + '&nbsp;&nbsp;&nbsp;&nbsp;到&nbsp;&nbsp;&nbsp;&nbsp;' + res.endTime.substring(0,16));
            $('.noteAddress').html(res.address);
            $('.noteInfo').html(res.desc);
        })
    })();

    function delect() {
        var r = confirm("真的要删除？不考虑一下吗？")
        var id = window
            .location
            .search
            .split('=')[1];

        if (r == true) {
            fetch(hostUrl + '/api/delSchedule', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({attr: "_id", val: id})
            }).then((res) => {
                return res.json()
            }).then((res) => {
                if (res.status == 'success') {
                    alert('删除成功！！');
                    window.location.href = './index.html';
                }
            })
           
        }

    }
})