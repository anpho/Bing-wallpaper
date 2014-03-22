var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        $(function() {
            blackberry.io.sandbox = false;
            app.receivedEvent("deviceready");
        })
    },
    receivedEvent: function(a) {
        console.log("Received Event: " + a);
        app.initbbui();
    },
    debug: false,
    darkColoring: true,
    darkScreenColor: "#262626",
    darkScreenForeColor: "#E6E6E6",
    device: "z10",
    lang: "en-US",
    configDevice: function() {
        if (bb.device.is1280x768) {
            app.device = 'z10';
        } else if (bb.device.is720x720) {
            app.device = 'q10';
        } else if (bb.device.is1280x720) {
            app.device = 'z30';
        } else {
            app.device = 'fullSize';
        }
    },
    initbbui: function() {
        theme = localStorage.getItem("theme");
        if ('true' === theme) {
            app.darkColoring = true;
        } else {
            if (window.innerWidth === 720) {
                app.darkColoring = true;
            } else {
                app.darkColoring = false;
            }
        }
        var config;
        if (app.darkColoring) {
            config = {
                controlsDark: true,
                highlightColor:'#00ee00',
                listsDark: true
            };
        } else {
            config = {
                controlsDark: false,
                listsDark: false,
                highlightColor:'#00ee00',
                coloredTitleBar: true
            };
        }

        config.onscreenready = function(element, id) {
            app.lang = blackberry.system.language;
            i18n.process(element, app.lang);
            console.log('载入页面: ' + id);
            if (app.darkColoring) {
                var screen = element.querySelector('[data-bb-type=screen]');
                if (screen) {
                    screen.style['background-color'] = app.darkScreenColor;
                }
            }
            if (id === 'view') {

            }
        };
        config.ondomready = function(element, id, params) {
            if (id === 'view') {

                if (params) {

                } else {
                    console.log('show idx:' + currentdayidx);
                    showimage();
                }
                //bind events
                $('#_prev').bind('click', function() {
                    if (currentdayidx > 19) {
                        Toast.regular(i18n.get('nomore', app.lang), 1000);
                    } else {
                        currentdayidx += 1;
                        showimage();
                    }
                });
                $('#_prev2').bind('click', function() {
                    if (currentdayidx > 19) {
                        Toast.regular(i18n.get('nomore', app.lang), 1000);
                    } else {
                        currentdayidx += 1;
                        showimage();
                    }
                });
                $('#_next').bind('click', function() {
                    if (currentdayidx === 0) {
                        Toast.regular(i18n.get('nomore2', app.lang), 1000);
                    } else {
                        currentdayidx -= 1;
                        showimage();
                    }
                });
                $('#_next2').bind('click', function() {
                    if (currentdayidx === 0) {
                        Toast.regular(i18n.get('nomore2', app.lang), 1000);
                    } else {
                        currentdayidx -= 1;
                        showimage();
                    }
                });
                $('#_copyurl').bind('click', function() {
                    community.clipboard.setText(currenturl);
                });
                $('#_share').bind('click', function() {
                    Invoke.targets(cachedurl);
                });
                $('#_set').bind('click', function() {
                    invocation.HomeScreen.setWallpaper(cachedurl, function(result) {
                        if (!result) {
                            Toast.regular(invocation.lastError, 1500);
                        }
                    })
                });
                $('#_set2').bind('click', function() {
                    invocation.HomeScreen.setWallpaper(cachedurl, function(result) {
                        if (!result) {
                            Toast.regular(invocation.lastError, 1500);
                        }
                    })
                });
                $('#_reload').bind('click', function() {
                    localStorage.removeItem(currentday.format('yyyy-MM-dd'));
                    showimage();
                });
                $('#_save').bind('click', function() {
                    bingwp.getDaysBeforeWallpaper(function(u) {
                        invocation.Browser.openurl(u, function(d) {
                            if (!d) {
                                Toast.regular(invocation.lastError, 1500);
                            }
                        })
                    }, currentdayidx, 'fullSize');
                });
            }
        };

        bb.init(config);
        if (app.darkColoring) {
            document.body.style['background-color'] = app.darkScreenColor;
            document.body.style['color'] = app.darkScreenForeColor;
        }
        app.configDevice();
        bb.pushScreen('view.html', 'view');
        //navigator.splashscreen.hide();
    }
};
function showimage() {
    $('#_image').empty();
    $('#ind').show();
    var td = new Date();
    td.setDate(td.getDate() - currentdayidx);
    currentday = td;
    $('#_notes').text(td.toLocaleDateString());
    bingwp.getDaysBeforeWallpaper(function(url) {
        currenturl = url;
        cache.get(url, currentday.format('yyyy-MM-dd'), '_image', function(u, id) {
            var i = new Image();
            i.src = u;
            cachedurl = u;
            i.style['width'] = '100%';
            $('#ind').hide();
            $('#_image').append(i);
        });
    }, currentdayidx, app.device);
}
var currentdayidx = 0;
var currentday = null;
var currenturl = '';
var cachedurl = '';

var bingwp = {
    lang: 'zh-CN',
    apiurl: "http://www.bing.com/HPImageArchive.aspx?format=js&idx={idx}&n={n}&mkt={lang}",
    get: function(callback, idx, n, lang) {
        var url = bingwp.apiurl.replace('{idx}', idx).replace('{n}', n).replace('{lang}', lang);
        $.getJSON(url).done(function(data) {
            callback(data);
        }).fail(function(data) {
            callback(null);
        });
    },
    getToday: function(callback) {
        this.getDayBefore(0, function(d) {
            callback(d);
        });
    },
    getDayBefore: function(idx, callback) {
        bingwp.get(function(d) {
            callback(d);
        }, idx, 1, bingwp.lang);
    },
    getDaysBeforeWallpaper: function(callback, idx, size) {
        bingwp.getDayBefore(idx, function(d) {
            if (d) {
                var u = d['images'][0].urlbase;
                u = 'http://www.bing.com' + u + bingwp[size];
                callback(u);
            } else {
                callback(null);
            }
        });
    },
    getTodayWallpaper: function(callback, size) {
        bingwp.getToday(function(d) {
            if (d) {
                var u = d['images'][0].urlbase;
                u = 'http://www.bing.com' + u + size;
                callback(u);
            } else {
                callback(null);
            }
        });
    },
    "fullSize": '_1920x1200.jpg',
    "z10": '_768x1280.jpg',
    "z30": '_720x1280.jpg',
    "q10": '_720x1280.jpg'
};

Date.prototype.format = function(format) {
    //对Date对象的扩展，实现日期格式化功能。
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};