$(function () {
    var username = getCookie('username');
    var userphone = getCookie('userphone');
    var st1 = $('#startTime1');
    var st2 = $('#startTime2');
    var ot1 = $('#overTime1');
    var ot2 = $('#overTime2');
    var $title = $('#title');
    var startTime;
    var overTime;
    var id = window
        .location
        .search
        .split('=')[1];

    $('.goBack').on('click', function () {
        window.location.href = './index.html';
    });

    (function () {
        var i = 1;
        $('.isAllDay').on('click', function () {
            if (i == 1) {
                $(this).addClass('on');
                $('.view2').show();
                $('.view1').hide();
                i = -i;
            } else {
                $(this).removeClass('on');
                $('.view2').hide();
                $('.view1').show();
                i = -i;
            }
        });
    })();

    (function () {
        var i = 1;
        $('.isAlert').on('click', function () {
            if (i == 1) {
                $(this).addClass('on');
                $('.isAlert-con').slideDown();
                i = -i;
            } else {
                $(this).removeClass('on');
                $('.isAlert-con').slideUp();
                i = -i;
            }
        });
    })();
    (function () {
        var i = 1;
        $('.isRepeat').on('click', function () {
            if (i == 1) {
                $(this).addClass('on');
                $('.isRepeat-con').slideDown();
                i = -i;
            } else {
                $(this).removeClass('on');
                $('.isRepeat-con').slideUp();
                i = -i;
            }
        });
    })();

    $('#startTime1').on('change', function () {
        let data = $(this).val();

        let time = data.split('T')[0] + '  ' + data.split('T')[1];
        time = time.substring(0, 17);
        $('.view1 .startTime i').html(time);
    })
    $('#startTime2').on('change', function () {
        let data = $(this).val();

        let time = data.split('T')[0] + '  ' + data.split('T')[1];
        time = time.substring(0, 10);
        $('.view2 .startTime i').html(time);
    })
    $('#overTime1').on('change', function () {
        let data = $(this).val();

        let time = data.split('T')[0] + '  ' + data.split('T')[1];
        time = time.substring(0, 17);
        $('.view1 .overTime i').html(time);
    })
    $('#overTime2').on('change', function () {
        let data = $(this).val();

        let time = data.split('T')[0] + '  ' + data.split('T')[1];
        time = time.substring(0, 10);
        $('.view2 .overTime i').html(time);
    })

    //提交日程
    $('.submitEvent p').on('click', function () {
        submit(id);

    });

    function submit(id) {

        var st1_val = st1
            .val()
            .replace(/T/g, ' ');
        var ot1_val = ot1
            .val()
            .replace(/T/g, ' ');
        if (id) {
            st1_val = st1
                .val()
                .replace(/T/g, ' ') + ':00';
            ot1_val = ot1
                .val()
                .replace(/T/g, ' ') + ':00';
        }

        //2.22

        console.log(ot1_val.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '').substring(0, 12));
        if (ot1_val.replace(/-/g, '').replace(/:/g,'').replace(/ /g,'').substring(0, 12) - st1_val.replace(/-/g, '').replace(/:/g,'').replace(/ /g,'').substring(0, 12) < 0) {
            alert('开始时间不能小于结束时间');
            return false;
        }

        st2_val = st2.val() || moment().format();
        ot2_val = ot2.val() || moment().format();
       
        if (ot2_val.replace(/-/g, '') - st2_val.replace(/-/g, '') < 0) {
            alert('开始时间不能小于结束时间');
            return false;
        }

        //2.22

        title = $title.val() || '新日程';
        var address = $('#address').val() || '';
        var dec = $('#dec').val() || '';
        var isAllDay = $('#isAllDay').hasClass('on');

        if (isAllDay) {
            isAllDay = 1;
            startTime = moment(st2_val).format('YYYY-MM-DD HH:mm:ss');
            overTime = moment(ot2_val).format('YYYY-MM-DD HH:mm:ss');
        } else {
            isAllDay = 0;
            if (!id) {
                startTime = moment(st1_val).format('YYYY-MM-DD HH:mm:ss');
                overTime = moment(ot1_val).format('YYYY-MM-DD HH:mm:ss');
            } else {
                // startTime = st1_val; overTime = ot1_val; console.log(startTime);

                startTime = moment(st1_val).format('YYYY-MM-DD HH:mm:ss');
                overTime = moment(ot1_val).format('YYYY-MM-DD HH:mm:ss');
            }

        }

        console.log(startTime);
        var tx = moment(startTime)
            .subtract(10, 'm')
            .format('YYYY-MM-DD HH:mm:ss');
        console.log(tx);

        var alertTime = [];
        var alertTimeIndex = [];
        $('input[name = "tixing"]:checked').each(function () {
            var val = $(this).val();
            console.log(val);
            switch (val) {
                case '10':
                    val = moment(startTime)
                        .subtract(10, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '15':
                    val = moment(startTime)
                        .subtract(15, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '30':
                    val = moment(startTime)
                        .subtract(30, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '60':
                    val = moment(startTime)
                        .subtract(60, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '1d':
                    val = moment(startTime)
                        .subtract(1, 'd')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '1w':
                    val = moment(startTime)
                        .subtract(1, 'w')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                default:
                    //5min
                    val = moment(startTime)
                        .subtract(5, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');

            }
            alertTime.push(val);
        });
        $('input[name = "tixing"]').each(function (i, v) {
            if ($(this).is(":checked")) {
                alertTimeIndex.push(i);
            }
        });

        if (alertTime.length == 0) {
            alertTime.push(moment(startTime).add(5, 'm').format('YYYY-MM-DD HH:mm:ss'));
        }

        var cycleTime = $('input[name = "cycleTime"]:checked').val();
        //console.log(alertTimeIndex);
        var sData = {
            "title": title,
            "name": username,
            "phone": userphone,
            "desc": dec,
            "address": address,
            "alertTime": alertTime,
            "isAllDay": isAllDay,
            "startTime": startTime,
            "endTime": overTime,
            "alertTimeIndex": alertTimeIndex
        }

        console.log(sData);
        //alert(id);
        if (!id) {
            //alert(id);
            fetch(hostUrl + '/api/addSchedule', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sData)
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res)
                if (res.status == 'success') {
                    alert('添加日程成功！');
                    window.location.href = './index.html';
                }
            })
        } else {
            console.log(sData);
            console.log(startTime);
            console.log(overTime);
            fetch(hostUrl + '/api/updateSchedule', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'_id': id, 'updata': sData})
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res)
                if (res.status == 'success') {
                    alert('修改日程成功！');
                    window.location.href = './index.html';
                } else {
                    alert(res.mes);
                }
            })
        };

    };

    //修改日程逻辑

    (function () {
        var id = window
            .location
            .search
            .split('=')[1];
        if (!id) {
            return false;
        }
        fetch(hostUrl + '/api/findScheduleByAttr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({attr: "_id", val: id})
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            //设置页面值
            $('#title').val(res.title);
            $('#address').val(res.address);
            $('#address').val(res.address);
            $('#dec').val(res.desc);
            if (!res.isAllDay) {
                //非全天  (0)

                console.log(res.startTime.split(' ')[0] + 'T' + res.startTime.split(' ')[1]);
                $('#startTime1').val(res.startTime.split(' ')[0] + 'T' + res.startTime.split(' ')[1]);
                $('#overTime1').val(res.endTime.split(' ')[0] + 'T' + res.endTime.split(' ')[1]);

                var t1 = res
                    .startTime
                    .split(' ')[0] + '  ' + res
                    .startTime
                    .split(' ')[1];
                var t2 = res
                    .endTime
                    .split(' ')[0] + '  ' + res
                    .endTime
                    .split(' ')[1];
                //**** */
                $('.view1 .startTime i').remove();
                $('.view1 .overTime i').remove();
                $('.view1 .startTime').append('<i>' + t1.substring(0, 17) + '</i>');
                $('.view1 .overTime').append('<i>' + t2.substring(0, 17) + '</i>');

            } else {
                $('.isAllDay').click();
                //全天
                $('#startTime2').val(res.startTime.split(' ')[0]);
                $('#overTime2').val(res.endTime.split(' ')[0]);

                // ***
                $('.view2 .startTime i').remove();
                $('.view2 .overTime i').remove();
                $('.view2 .startTime').append('<i>' + res.startTime.split(' ')[0] + '</i>');
                $('.view2 .overTime').append('<i>' + res.endTime.split(' ')[0] + '</i>');
            }
            $('#isAlert')
                .eq(0)
                .addClass('on');
            if (res.alertTimeIndex.length) {
                $('input[name = "tixing"]')
                    .eq(0)
                    .prop('checked', true);
                $('.isAlert-con').show();
                $('.isAlert').click();
                $(res.alertTimeIndex).each(function (i, v) {
                    $('input[name = "tixing"]')
                        .eq(v)
                        .prop('checked', true);
                })
            }

        })
    })();

    //处理input时间选择
    (function () {
        if (!id) {
            //新增日程
            var data = moment().format('YYYY-MM-DD HH:mm:ss');
            var dataed = moment()
                .add(60, 'm')
                .format('YYYY-MM-DD HH:mm:ss');
            var time = data.split(' ')[0] + 'T' + data.split(' ')[1];
            var timeed = dataed.split(' ')[0] + 'T' + dataed.split(' ')[1];
            $('#startTime1').val(time);
            $('#startTime2').val(time);
            $('#overTime1').val(timeed);
            $('#overTime2').val(timeed);
            $('.view1 .startTime i').remove();
            $('.view1 .overTime i').remove();
            $('.view2 .startTime i').remove();
            $('.view2 .overTime i').remove();

            $('.view1 .startTime').append('<i>' + time.replace(/T/, '  ').substring(0, 17) + '</i>');
            $('.view2 .startTime').append('<i>' + time.replace(/T/, '  ').substring(0, 10) + '</i>');
            $('.view1 .overTime').append('<i>' + timeed.replace(/T/, '  ').substring(0, 17) + '</i>');
            $('.view2 .overTime').append('<i>' + timeed.replace(/T/, '  ').substring(0, 10) + '</i>');

        } else {
            //修改日程
            var f = $('.isAllDay').hasClass('on');
            if (!f) {
                //全天事件
                var data = moment().format('YYYY-MM-DD HH:mm:ss');
                var dataed = moment()
                    .add(60, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                var time = data.split(' ')[0] + 'T' + data.split(' ')[1];
                var timeed = dataed.split(' ')[0] + 'T' + dataed.split(' ')[1];
                $('#startTime1').val(time);
                $('#overTime1').val(timeed);
                $('.view1 .startTime i').remove();
                $('.view1 .overTime i').remove();

                $('.view1 .startTime').append('<i>' + time.replace(/T/, '  ').substring(0, 17) + '</i>');

                $('.view1 .overTime').append('<i>' + timeed.replace(/T/, '  ').substring(0, 17) + '</i>');

            } else {
                //非全天时间
                var data = moment().format('YYYY-MM-DD HH:mm:ss');
                var dataed = moment()
                    .add(60, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                var time = data.split(' ')[0] + 'T' + data.split(' ')[1];
                var timeed = dataed.split(' ')[0] + 'T' + dataed.split(' ')[1];
                $('#startTime2').val(time);
                $('#overTime2').val(timeed);
                $('.view2 .startTime i').remove();
                $('.view2 .overTime i').remove();
                $('.view2 .startTime').append('<i>' + time.replace(/T/, '  ').substring(0, 10) + '</i>');
                $('.view2 .overTime').append('<i>' + timeed.replace(/T/, '  ').substring(0, 10) + '</i>');
            }
        }

        // $(".time").on("click", "i", function () {     $(this).prev().trigger("blur");
        // });
    })();

})