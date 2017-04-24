$(document).ready(function() {
    /* eslint no-console:0 */
    /* eslint eqeqeq: 0 */



    try {
        var time
          , startTime
          ;

        $.ajax({
            url: 'https://js.dooh.xyz/exchange_dynamics/server/redirect.php',
            beforeSend: function(){
                time = new Date();
                startTime = time.getTime();
            },
            success: function(d) {
                time = new Date();
                console.log((time.getTime() - startTime) / 1000);

                try {
                    console.log('exchange_dynamics data - ',JSON.parse(d));
                    var response = JSON.parse(d);
                    var data = {};

                    for (var mounth in response) {

                        data[mounth] = {};
                        data[mounth].labels = [];
                        data[mounth].series = [];
                        var arr = [];

                        for (var item in response[mounth]) {
                            data[mounth].labels.push(item);
                            arr.push({meta: 'descr', value: parseFloat(response[mounth][item].USD.replace(' RUB', '').replace(',','.'))});
                            data[mounth].series = new Array(arr);
                        }
                    }

                    var mounthNamesArr = [];
                    for (var m in data) {
                        mounthNamesArr.push(m);
                    }

                    console.log(data);

                    var options = {
                        width: 480,
                        height: 300,
                        fullWidth: true/*,
                        showArea: true,
                        plugins: [
                            Chartist.plugins.tooltip()
                        ]*/
                    };

                    $('.header__mounth').html(mounthNamesArr[0]);
                    var chart = new Chartist.Line('.ct-chart', data[mounthNamesArr[0]], options);


                    var seq = 0,
                        delays = 80,
                        durations = 500;

                    chart.on('created', function() {
                        seq = 0;
                    });

                    var points = [];

                    var max = 0;
                    chart.on('draw', function(data) {
                        seq++;

                        if (data.type == 'point') {
                            points[data.index] = data.value.y;
                            //console.log(data);
                        }


                        if (data.type === 'line') {
                            data.element.animate({
                                opacity: {
                                    begin: seq * delays + 1000,
                                    dur: durations,
                                    from: 0,
                                    to: 1
                                }
                            });
                        } else if (data.type === 'label' && data.axis === 'x') {
                            data.element.animate({
                                y: {
                                    begin: seq * delays,
                                    dur: durations,
                                    from: data.y + 100,
                                    to: data.y,
                                    easing: 'easeOutQuart'
                                }
                            });
                        } else if (data.type === 'label' && data.axis === 'y') {
                            data.element.animate({
                                x: {
                                    begin: seq * delays,
                                    dur: durations,
                                    from: data.x - 100,
                                    to: data.x,
                                    easing: 'easeOutQuart'
                                }
                            });
                        } else if (data.type === 'point') {
                            data.element.animate({
                                x1: {
                                    begin: seq * delays,
                                    dur: durations,
                                    from: data.x - 10,
                                    to: data.x,
                                    easing: 'easeOutQuart'
                                },
                                x2: {
                                    begin: seq * delays,
                                    dur: durations,
                                    from: data.x - 10,
                                    to: data.x,
                                    easing: 'easeOutQuart'
                                },
                                opacity: {
                                    begin: seq * delays,
                                    dur: durations,
                                    from: 0,
                                    to: 1,
                                    easing: 'easeOutQuart'
                                }
                            });
                        } else if (data.type === 'grid') {
                            var pos1Animation = {
                                begin: seq * delays,
                                dur: durations,
                                from: data[data.axis.units.pos + '1'] - 30,
                                to: data[data.axis.units.pos + '1'],
                                easing: 'easeOutQuart'
                            };

                            var pos2Animation = {
                                begin: seq * delays,
                                dur: durations,
                                from: data[data.axis.units.pos + '2'] - 100,
                                to: data[data.axis.units.pos + '2'],
                                easing: 'easeOutQuart'
                            };

                            var animations = {};
                            animations[data.axis.units.pos + '1'] = pos1Animation;
                            animations[data.axis.units.pos + '2'] = pos2Animation;
                            animations['opacity'] = {
                                begin: seq * delays,
                                dur: durations,
                                from: 0,
                                to: 1,
                                easing: 'easeOutQuart'
                            };

                            data.element.animate(animations);
                        }
                    });

                    // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
                    var i = 1;
                    chart.on('created', function(d) {
                        /*console.log(d);*/

                        /*console.log(points);

                        console.log(Math.max.apply(Math, points));
                        console.log(Math.min.apply(Math, points));*/

                        $('.js-descr-max').html(Math.max.apply(Math, points).toFixed(2))
                        $('.js-descr-min').html(Math.min.apply(Math, points).toFixed(2))
                        $('.js-descr-average').html(getAverageValue(points).toFixed(2))

                        setTimeout(function() {
                            $('.js-description').addClass('active');
                        }, 12000)


                        if (window.__exampleAnimateTimeout) {
                            clearTimeout(window.__exampleAnimateTimeout);
                            window.__exampleAnimateTimeout = null;
                        }

                        window.__exampleAnimateTimeout = setTimeout(function() {

                            if (i < mounthNamesArr.length){
                                $('.header__mounth').html(mounthNamesArr[i]);
                                $('.js-description').removeClass('active');
                                chart.update(data[mounthNamesArr[i]]);
                                i++;
                            } else {
                                i = 0;
                                $('.header__mounth').html(mounthNamesArr[i]);
                                $('.js-description').removeClass('active');
                                chart.update(data[mounthNamesArr[i]]);
                            }
                        }, 18000);
                    });

                    $('.content__wrapper').show();
                    $('.js-block').eq(0).fadeIn(500).addClass('active');
                    $('.preloader').hide();
                } catch (e) {
                    console.log(e);
                    console.log('ошибка внутри ajax');
                }

            },
            complete: function() {},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
                $('.preloader').addClass('error')
            }
        })
    } catch (e) {
        console.log(e);
        console.log('ошибка ajax');
        $('.preloader').addClass('error')
    }

    function getAverageValue(arr) {
        var sum = 0;

        for (var i = 0; arr.length > i; i++) {
            sum += arr[i];
        }

        return sum / arr.length;

    }
})