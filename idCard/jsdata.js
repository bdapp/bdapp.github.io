// 数据请求次数限制，每日

var JSData = {
    ns: null,
    init: function () {
        var slug = null;
        var url = location.href;
        if (location.href.indexOf("run//display") > -1) {
            JSRunTrace('============================================');
            JSRunTrace('   需要先保存项目才可以使用 JSData 数据存储功能');
            JSRunTrace('============================================');
            return;
        }
        var r = url.match(/\/([0-9a-zA-Z]*)\/result\/light/);
        if (r != null) {
            slug = r[1];
        } else {
            r = url.match(/\/([0-9a-zA-Z]*)\/result\/display/);
            if (r != null) {
                slug = r[1];
            } else {
                r = url.match(/run\/([0-9a-zA-Z]*)\/display/);
                if (r != null) {
                    slug = r[1];
                }
            }
        }
        this.setNameSpace(slug);
    },
    set: function (key, value, callback) {
        this.ajax.post('/data/set/', {
            ns: this.ns,
            key: key,
            value: this.parseValue(value)
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    get: function (key, callback) {
        this.ajax.post('/data/get', {
            ns: this.ns,
            key: key
        }, function (result) {
            callback && callback(JSON.parse(result));
        })
    },

    multiget: function (keys, callback) {
        this.ajax.post('/data/multiget', {
            ns: this.ns,
            keys: keys
        }, function (result) {
            callback && callback(JSON.parse(result));
        })
    },
    append: function (key, value, callback) {
        //字符串追加
        this.ajax.post('/data/append/', {
            ns: this.ns,
            key: key,
            value: this.parseValue(value)
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    parseValue: function (value) {
        if ('object' == (typeof value )) {
            return JSON.stringify(value);
        } else {
            return value;
        }
    },
    plus: function (key,value, callback) {
        //加法
        this.ajax.post('/data/plus', {
            ns: this.ns,
            key: key,
            value:value
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    minus: function (key,value, callback) {
        //减法
        this.ajax.post('/data/minus', {
            ns: this.ns,
            key: key,
            value:value
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    drop: function (key, callback) {
        this.ajax.post('/data/drop', {
            ns: this.ns,
            key: key
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    setPassword: function (key, value, callback) {
        this.ajax.post('/data/setPassword/', {
            ns: this.ns,
            key: key,
            value: this.parseValue(value)
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    validPassword: function (key, value, callback) {
        this.ajax.post('/data/validPassword/', {
            ns: this.ns,
            key: key,
            value: this.parseValue(value)
        }, function (result) {
            callback && callback(JSON.parse(result));
        });
    },
    setPW: function (key, value, callback) {
        return this.setPassword(key, value, callback);
    },
    validPW: function (key, value, callback) {
        return this.validPassword(key, value, callback);
    },
    setNameSpace: function (ns) {
        this.ns = ns;
    },
    ajax: {
        get: function (url, callback) {
            if (window.XMLHttpRequest) {
                var obj = new XMLHttpRequest();
            } else {
                var obj = new ActiveXObject('Microsoft.XMLHTTP');
            }
            obj.open('GET', url, true);
            obj.onreadystatechange = function () {
                if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
                    callback.call(this, obj.responseText);  //从服务器获得数据
                }
            };
            obj.send(null);
        },
        post: function (url, data, callback) {
            if (window.XMLHttpRequest) {
                var obj = new XMLHttpRequest();
            } else {
                var obj = new ActiveXObject('Microsoft.XMLHTTP');
            }
            obj.open("POST", url, true);
            obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            obj.onreadystatechange = function () {
                if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {
                    callback.call(this, obj.responseText);
                }
            };
            obj.send(this.formatParams(data));
        },
        formatParams: function (data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURI(name) + "=" + encodeURI(data[name]));
            }
            //设置随机数，防止缓存
            arr.push("t=" + Math.random());
            return arr.join("&");
        }
    }
};
JSData.init();