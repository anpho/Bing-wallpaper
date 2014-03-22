
var cache = {
    get: function(url, filename, id, callback) {
        /*
         * url : 图片网址
         * filename : 当前日期
         * callback(string) ：回调，返回本地地址或者网址。
         */
        if (this.isExisted(filename)) {
            callback(this.buildfileurl(filename), id);
            return;
        }
        /*
         * 缓存中不存在，开始下载
         */
        console.log("downloading " + url);
        try {
            blackberry.io.filetransfer.download(
                    url,
                    cache.buildurl(filename),
                    function(result) {
                        console.log("file downloaded,fullPath: " + result.fullPath);
                        localStorage.setItem(filename, true);
                        callback('file://' + result.fullPath, id);
                    },
                    function(result) {
                        console.error(result);
                    });
        }
        catch (e) {
            console.error(e);
        }
    },
    isExisted: function(filename) {
        if (localStorage.getItem(filename)) {
            return true;
        } else {
            return false;
        }
    },
    buildurl: function(str) {
        return blackberry.io.home + "/" + str + ".jpg";
    },
    buildfileurl: function(str) {
        return "file://" + this.buildurl(str);
    }
};
