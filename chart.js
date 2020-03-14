var chart;

function barChartRender() {
    chart = new Highcharts.chart('container', {
        chart: {
            type: 'bar',
            // height: '100%',
            options3d: {
                enabled: true,
                alpha: 5,
                beta: 15,
                viewDistance: 25,
                depth: 60
            }
        },
        title: {
            text: 'Coronavirus Dashboard'
        },
        subtitle: {
            text: 'Coronavirus Status'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<center>{point.y} cases</center>',
            // formatter: function() {
            //     return '<b>' + this.x + '</b></br>' +
            //         this.series.name + ': ' + this.y + '</br>' +
            //         'Total: ' + (this.point.stackTotal - this.y);
            // }
        },
        xAxis: {
            categories: AllCountries,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '12px'
                }
            }
        },
        yAxis: {
            min: 0,
            minorTickInterval: 0,
            tickInterval: 5000,
            title: {
                text: 'Coronavirus Status (Only first 50 countires)'
            }
        },
        plotOptions: {
            series: {
                minPointLength: 10,
                dataLabels: [{
                    enabled: true,
                    format: '{y}'
                }],
                stacking: 'normal',
                depth: 40
            }
        },
        series: [{
            name: 'Total Cases',
            data: TotalCases
        }, {
            name: 'Total Deaths',
            data: TotalDeaths
        }, {
            name: 'Today Cases',
            data: TodayCases_Chart
        }, {
            name: 'Today Deaths',
            data: TodayDeaths_Chart
        }]
    });
}

function bubbleChartRender() {
    chart = Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%',
            load: function() {
                this.series.forEach(bubbles => {
                    bubbles.forEach(bubble => {
                        if (bubble.name.includes(currentSearch)) {
                            bubble.select();
                        }
                    });
                });
            }
        },
        title: {
            text: 'Coronavirus Dashboard'
        },
        subtitle: {
            text: 'Coronavirus Status (Only first 50 countires)'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} cases'
        },
        plotOptions: {
            packedbubble: {
                allowPointSelect: true,
                minSize: '50%',
                maxSize: '150%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    format: '<b>{point.name}</b></br>{point.value} cases',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 1
                    },
                    style: {
                        fontSize: '12px',
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [{
                name: 'Total Cases',
                data: countriesTotalCasesForBubbleArray
            },
            {
                name: 'Total Deaths',
                data: countriesTotalDeathsForBubbleArray
            },
            {
                name: 'Today Cases',
                data: countriesTodayCasesForBubbleArray
            },
            {
                name: 'Today Deaths',
                data: countriesTodayDeathsForBubbleArray
            }
        ]
    });
}