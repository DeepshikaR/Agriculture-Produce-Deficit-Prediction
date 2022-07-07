const ctx = document.getElementById('bar').getContext('2d');
const ctxL = document.getElementById('price').getContext('2d');
let backgroundColor = {
    Chennai: 'rgba(255, 99, 132, 0.5)',
    Ahmedabad: 'rgba(54, 162, 235, 0.5)',
    Amritsar: 'rgba(255, 206, 86, 0.5)',
    Bangaluru: 'rgba(75, 192, 192, 0.5)',
    Bopal: 'rgba(153, 102, 255, 0.5)'
};
let borderColor = {

    Chennai: 'rgba(255, 99, 132, 1)',
    Ahmedabad: 'rgba(54, 162, 235, 1)',
    Amritsar: 'rgba(255, 206, 86, 1)',
    Bangaluru: 'rgba(153, 102, 255, 1)',
    Bopal: 'rgba(255, 159, 64, 1)'
};
let metaAvailData = {
    _2010: {
        Chennai: [12860,
            11570,
            12680,
            11780,
            12320,
            13650,
            13670,
            12340,
            10990,
            10900,
            10040,
            10600
        ],
        Ahmedabad: [5020,
            6345,
            6905,
            9965,
            5696,
            11844,
            11653,
            6503,
            8125,
            5636,
            4943,
            5122
        ],
        Amritsar: [3333,
            4165,
            4925,
            4465,
            4750,
            4775,
            4950,
            3165,
            3350,
            3275,
            2750,
            2915
        ],
        Bangaluru: [28050,
            24580,
            28380,
            32530,
            28610,
            28240,
            26070,
            33373,
            41720,
            79250,
            39510,
            37500
        ],
        Bopal: [832,
            1668,
            1736,
            1904,
            3608,
            3267,
            1317,
            855,
            681,
            758,
            762,
            803
        ],
    },
    _2011: {
        Chennai: [11250,
            12850,
            14480,
            10580,
            13710,
            11860,
            12710,
            16425,
            16410,
            11765,
            10861,
            13489
        ],
        Ahmedabad: [5354,
            8292,
            8886,
            7820,
            7381,
            9523,
            9392,
            8446,
            8918,
            6362,
            8107,
            9241
        ],
        Amritsar: [2165,
            4060,
            4565,
            3755,
            1415,
            2290,
            1780,
            1835,
            2885,
            3345,
            3485,
            5390
        ],
        Bangaluru: [21500,
            29370,
            26190,
            24250,
            24550,
            25450,
            23820,
            23860,
            46860,
            44500,
            70700,
            56500,
        ],
        Bopal: [1114,
            1566,
            3000,
            3459,
            3668,
            2885,
            1143,
            1106,
            969,
            847,
            2293,
            4861
        ],
    },
    _2012: {
        Chennai: [18180,
            12570,
            17850,
            12090,
            14170,
            11910,
            11992,
            10910,
            11270,
            10680,
            10620,
            8130
        ],
        Ahmedabad: [8119,
            10773,
            10975,
            5838,
            5549,
            5032,
            5681,
            5116,
            3558,
            5779,
            3421,
            3217
        ],
        Amritsar: [5395, 3968,
            4260,
            3665,
            5620,
            3365,
            4545,
            3790,
            3680,
            3420,
            3362,
            3130
        ],
        Bangaluru: [47600, 37150, 27160, 23940, 18400, 24930, 23780, 25850, 38610, 48175, 78600, 25280],
        Bopal: [3739, 3599, 3012, 2025, 4424, 4339, 1344, 1547, 1441, 1010, 1179, 1175],
    },
    _2013: {
        Chennai: [11670, 13110, 12740, 11990, 14350, 11990, 11940, 11010, 11350, 11180, 10980, 11470],
        Ahmedabad: [8630, 14417, 12995, 15383, 14114, 12582, 11588, 7644, 6877, 13009, 9723, 10534],
        Amritsar: [3500, 2825, 2895, 3000, 4000, 3520, 2735, 1275, 1310, 1510, 1680, 2370],
        Bangaluru: [22100, 19725, 21900, 28095, 19830, 26826, 36471, 46196, 131230, 149282, 84483, 73170],
        Bopal: [1475, 1366, 998, 2301, 3900, 3823, 1421, 999, 1301, 2608, 1246, 2993],
    },
    _2014: {
        Chennai: [16510, 12520, 12650, 10590, 15662, 12530, 12880, 10283, 12720, 10610, 12780, 11710],
        Ahmedabad: [12719, 14512, 17399, 13171, 13814, 14773, 10375, 10151, 13717, 13446, 13326, 12371],
        Amritsar: [4705, 5835, 3800, 3055, 4315, 4335, 3040, 4300, 5160, 3880, 4286, 3390],
        Bangaluru: [63193, 53344, 67468, 63059, 57286, 49775, 41480, 46786, 102997, 154265, 133859, 87731],
        Bopal: [3635, 2576, 3491, 3210, 3855, 3592, 2984, 1642, 3464, 1560, 1067, 2308],
    },
    _2015: {
        Chennai: [11440, 18750, 13200, 16820, 13555, 13350, 12600, 13260, 12180, 11170, 26180, 11220],
        Ahmedabad: [13405, 13009, 11983, 14303, 13349, 11567, 11451, 7103, 7425, 13974, 17691, 17078],
        Amritsar: [5920, 2555, 1390, 1560, 1360, 1368, 1218, 1070, 987, 905, 1780, 2410],
        Bangaluru: [74978, 26795, 41339, 43534, 44227, 43403, 45957, 83437, 114533, 173788, 77516, 53853],
        Bopal: [2513, 2687, 1943, 2936, 3211, 2637, 1862, 1170, 1376, 2299, 3084, 2794],
    },
    _2016: {
        Chennai: [11860, 15760, 14465, 11430, 12505, 14350, 12240, 13210, 13870, 14290, 15320, 12450],
        Ahmedabad: [19722, 17281, 15928, 20460, 16673, 16885, 16566, 19736, 19011, 16302, 16392, 19092],
        Amritsar: [2960, 1925, 3010, 2630, 2835, 2317, 2140, 2290, 4030, 3900, 3520, 2470],
        Bangaluru: [51819, 52636, 54066, 43289, 48979, 44579, 48149, 50457, 57279, 187836, 181683, 89761],
        Bopal: [2651, 4454, 4242, 4309, 5188, 3374, 2629, 2719, 3001, 3626, 3166, 2385],
    },
    _2017: {
        Chennai: [13820, 14710, 15040, 11240, 13680, 13460, 13340, 12440, 14920, 11830, 10900, 12990],
        Ahmedabad: [18887, 16713, 20378, 15707, 19229, 17756, 19299, 13233, 18090, 21214, 16698, 10977],
        Amritsar: [4160, 3660, 4700, 4490, 5250, 3617, 5070, 4895, 4974, 3870, 4370, 4960],
        Bangaluru: [57637, 35628, 45279, 48714, 49261, 54196, 49617, 27910, 53549, 98684, 65469, 45268],
        Bopal: [3427, 1739, 6408, 3423, 3458, 5942, 4228, 1734, 1323, 1092, 2256, 1495],
    },
    _2018: {
        Chennai: [17650, 18690, 12990, 12020, 14720, 13480, 13085, 13230, 12980, 13460, 12290, 15730],
        Ahmedabad: [13820, 14103, 13698, 17044, 17165, 16041, 17897, 16940, 18730, 16750, 6722, 6202],
        Amritsar: [1870, 5300, 5970, 6200, 7070, 5438, 6950, 4010, 6542, 5130, 6420, 8000],
        Bangaluru: [43258, 36718, 52904, 53721, 44139, 69265, 55239, 55729, 61700, 129269, 137285, 65121],
        Bopal: [1613, 1584, 1764, 4572, 4034, 2219, 1638, 1674, 2733, 2082, 1648, 3045],
    },
    _2019: {
        Chennai: [13120, 13070, 11530, 12470, 14680, 11770, 12180, 10470, 11403, 12720, 13430, 12642],
        Ahmedabad: [14263, 12184, 12269, 16046, 16086, 0, 7267, 15617, 16254, 14814, 12313, 10192],
        Amritsar: [8260, 2740, 7860, 7590, 7865, 6520, 7095, 5175, 5200, 5510, 4710, 3160],
        Bangaluru: [61363, 50224, 53392, 48478, 45229, 47577, 52246, 51765, 63188, 139206, 102924, 50300],
        Bopal: [3425, 3450, 3245, 3456, 3534, 1794, 1909, 1732, 1555, 2092, 1819, 1598],
    },
    _2020: {
        Chennai: [15540, 23820, 9970, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Ahmedabad: [12021, 11391, 12151, 0, 0, 6725, 8397, 0, 13417, 11131, 7642, 10829],
        Amritsar: [4139, 5460, 3010, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Bangaluru: [39474, 44473, 46386, 0, 0, 45336, 14927, 28572, 51773, 58800, 45386, 51195],
        Bopal: [3086, 2125, 2122, 0, 0, 2047, 2221, 1747, 1810, 2003, 1578, 2437],
    },
    _2021: {
        Chennai: [1580, 10300, 13990, 12130, 2100, 0, 1020, 11780, 13465, 10860, 2630, 0],
        Ahmedabad: [14590, 24641, 20755, 13992, 14338, 9048, 23739, 14257, 12439, 0, 0, 0],
        Amritsar: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Bangaluru: [44125, 47778, 66834, 38035, 8350, 20780, 36420, 37208, 40973, 108145, 14570, 0],
        Bopal: [2525, 2336, 4099, 1179, 0, 0, 0, 0, 0, 0, 0, 0],
    }
}
let metaPriceData = {
    Chennai: [2391.166667,
        2179.416667,
        1626.750000,
        3751.750000,
        2837.750000,
        4362.833333,
        2421.916667,
        2970.833333,
        2782.166667,
        4247.416667,
        1237.166667,
        3458.090909
    ],
    Ahmedabad: [1610.25, 1325.25, 1023.33, 2720.41, 1789.00, 2547.16, 1911.16, 2630.25, 2587.41, 3566.50, 3812.83, 3082.54],
    Amritsar: [1807.250006,
        1601.333333,
        1245.333333,
        3333.250000,
        2289.000000,
        3090.750000,
        1581.583333,
        2481.583333,
        2425.166667,
        3477.250000,
        1428.666667
    ],
    Bangaluru: [2082.416667,
        1694.833333,
        1449.250000,
        3130.583393,
        2348.500000,
        3226.000000,
        1793.589999,
        2213.500000,
        1894.333333,
        3326.166667,
        3285.916667,
        2929.083333
    ],
    Bopal: [1203.916667,
        1180.333333,
        732.083333,
        2481.000000,
        1561.083333,
        2468.083333,
        1062.333333,
        1631.000000,
        1543.000000,
        3015.416667,
        2466.916667,
        876.750000
    ],
}
let availData = metaAvailData._2021;

var myBarChart;
var myLineChart;

function generateLineGraph() {
    let data = [{
        label: 'Chennai',
        data: metaPriceData.Chennai,
        fill: false,
        borderColor: backgroundColor.Chennai,
        tension: 0.1
    }, {
        label: 'Ahedabad',
        data: metaPriceData.Ahmedabad,
        fill: false,
        borderColor: backgroundColor.Ahmedabad,
        tension: 0.1
    }, {
        label: 'Amritsar',
        data: metaPriceData.Amritsar,
        fill: false,
        borderColor: backgroundColor.Amritsar,
        tension: 0.1
    }, {
        label: 'Bangaluru',
        data: metaPriceData.Bangaluru,
        fill: false,
        borderColor: backgroundColor.Bangaluru,
        tension: 0.1
    }, {
        label: 'Bhopal',
        data: metaPriceData.Bopal,
        fill: false,
        borderColor: backgroundColor.Bopal,
        tension: 0.1
    }];
    myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
            datasets: data
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'black'
                    },
                    align: 'right',
                    position: 'top',


                },
                title: {
                    display: true,
                    text: 'Max Price In Each State Per Year',
                    color: 'black',
                    font: {
                        size: '24px'
                    }
                }
            },
            aspectRatio: 2.0,

        }
    });
}

function generateBarChart() {
    let barData = [{
            label: 'Chennai',
            data: availData.Chennai,
            backgroundColor: backgroundColor.Chennai,
            borderColor: borderColor.jan,
            borderWidth: 1
        },
        {
            label: 'Ahmedabad',
            data: availData.Ahmedabad,
            backgroundColor: backgroundColor.Ahmedabad,
            borderColor: borderColor.Ahmedabad,
            borderWidth: 1
        }, {
            label: 'Amritsar',
            data: availData.Amritsar,
            backgroundColor: backgroundColor.Amritsar,
            borderColor: borderColor.jan,
            borderWidth: 1
        }, {
            label: 'Bangaluru',
            data: availData.Bangaluru,
            backgroundColor: backgroundColor.Bangaluru,
            borderColor: borderColor.jan,
            borderWidth: 1
        }, {
            label: 'Bhopal',
            data: availData.Bopal,
            backgroundColor: backgroundColor.Bopal,
            borderColor: borderColor.jan,
            borderWidth: 1
        }
    ];
    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: barData
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'black'
                    },
                    align: 'right',
                    position: 'top',


                },
                title: {
                    display: true,
                    text: 'Availability of Crop Per Month of Each State',
                    color: 'black',
                    font: {
                        size: '24px'
                    }
                }
            }
        }
    });
}
generateBarChart();
generateLineGraph();
document.getElementById('yearOpt').onchange = () => {
    let yr = '_' + document.getElementById('yearOpt').value;
    availData = metaAvailData[yr];
    myBarChart.destroy();
    generateBarChart();
}