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
                app.darkColoring = true;
            }
        }
        var config;
        if (app.darkColoring) {
            config = {
                controlsDark: true,
                highlightColor: '#ffcc00',
                listsDark: true
            };
        } else {
            config = {
                controlsDark: false,
                listsDark: false,
                highlightColor: '#ffcc00',
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
                $('#_image').css("width",window.innerWidth);
                $('#_image').css("height",window.innerHeight);
                if (params) {

                } else {
                    console.log('show idx:' + currentdayidx);
                    showimage();
                }
                //bind events
                $('#_prev').bind('click', function() {
                    if (currentdayidx > 17) {
                        Toast.regular(i18n.get('nomore', app.lang), 1000);
                    } else {
                        currentdayidx += 1;
                        showimage();
                    }
                });
                $('#_prev2').bind('click', function() {
                    if (currentdayidx > 17) {
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

                Hammer(element.getElementById('_screen')).on('swiperight', function(ev) {
                    //prev
                    if (currentdayidx > 17) {
                        Toast.regular(i18n.get('nomore', app.lang), 1000);
                    } else {
                        currentdayidx += 1;
                        showimage();
                    }
                }).on('swipeleft', function(ev) {
                    //next
                    if (currentdayidx === 0) {
                        Toast.regular(i18n.get('nomore2', app.lang), 1000);
                    } else {
                        currentdayidx -= 1;
                        showimage();
                    }
                });
                Hammer(element.getElementById('_image')).on('tap hold doubletap', function(ev) {
                    toggleActionBar()
                });

                $('#_copyurl').bind('click', function() {
                    var a = community.clipboard.setText(currenturl);
                    if (a > 0) {
                        Toast.regular(i18n.get('copied', app.lang), 1000);
                    }
                    else {
                        Toast.regular(i18n.get('copied', app.lang), 1000);
                    }
                }
                );
                $('#_share').bind('click', function() {
                    Invoke.targets(cachedurl);
                });
                $('#_set').bind('click', function() {
                    if (bb.device.is720x720 || bb.device.is1440x1440) {
                        invocation.HomeScreen.setWallpaper(cachedurl, function(result) {
                            if (!result) {
                                Toast.regular(invocation.lastError, 1500);
                            }
                        });
                    } else {
                        blackberry.system.setWallpaper(cachedurl);
                    }
                });
                $('#_set2').bind('click', function() {
                    if (bb.device.is720x720 || bb.device.is1440x1440) {
                        invocation.HomeScreen.setWallpaper(cachedurl, function(result) {
                            if (!result) {
                                Toast.regular(invocation.lastError, 1500);
                            }
                        });
                    } else {
                        blackberry.system.setWallpaper(cachedurl);
                    }
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
var actionbarshow = true;
function toggleActionBar() {
    if (actionbarshow) {
        $('#_ab')[0].hide();
        actionbarshow = false;
    } else {
        $('#_ab')[0].show();
        actionbarshow = true;
    }
}
function hideActionBar() {
    $('#_ab')[0].hide();
    actionbarshow = false;
}
function showimage() {
    $('#_image').hide();
    $('#ind').show();
    var td = new Date();
    td.setDate(td.getDate() - currentdayidx);
    currentday = td;
    $('#_notes').text(td.toLocaleDateString());
    bingwp.getDaysBeforeWallpaper(function(url) {
        if (url === null) {
            Toast.regular('Error fetching image,please report to developer,Thanks.', 1000);
            return;
        }
        currenturl = url;

        cache.get(url, currentday.format('yyyy-MM-dd'), '_image', function(u, id) {
            /*
             var i = new Image();
             i.src = u;
             cachedurl = u;
             i.style['width'] = '100%';
             $('#ind').hide();
             $('#_image').append(i);
             */
            cachedurl = u;
            $('#ind').hide();
            $('#_image').css("background-image", "url('" + u + "')");
            $('#_image').show();
        });
    }, currentdayidx, app.device);
}
var currentdayidx = 0;
var currentday = null;
var currenturl = '';
var cachedurl = '';

var bingwp = {
    lang: app.lang,
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