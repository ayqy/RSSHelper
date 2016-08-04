angular.module('rsshelper.services', [])

.service('UIServ', ['$rootScope', '$location', function($rootScope, $location) {
    function showBottom(msg) {
        window.plugins.toast.showWithOptions({
            message: msg,
            duration: 'short',
            position: 'bottom',
            addPixelsY: -40  // added a negative value to move it up a bit (default 0)
        }
        // , onSuccess, // optional
        // onError    // optional
        );
    }

    function openUrl(sUrl) {
        // cordova plugin add org.apache.cordova.inappbrowser
console.log('open ' + sUrl);
        window.open(sUrl, '_system'); // 系统默认浏览器
    }
    function openInnerUrl(sPath, oParams) {
        console.log('to inner url: ' + sPath);
        $location.path(sPath).search(oParams || {});
    }
    function loading(bShow) {
        if (bShow === false) {
            // 隐藏loading
            $rootScope.isLoading = false;
        }
        else {
            // 显示loading
            $rootScope.isLoading = true;
        }
    }

    return {
        toast: showBottom,
        openUrl: openUrl,
        openInnerUrl: openInnerUrl,
        loading: loading
    };
}])

.service('DataServ', ['$http', 'UIServ', function($http, UIServ) {
    // 缓存数据项格式
    // sUrl: {
    //     sState: 'ON/OFF/READY',
    //     aCallback: [callback1, callback2],
    //     oData: {code: 200, date: {xxx}},
    //     iExpire: long
    // }

    // localStorage，缓存过期控制
    var storage = (function() {
        var oStorage = localStorage;
        
        // return null, if failed
        function get(sKey) {
            var res = oStorage.getItem(sKey);
            res = JSON.parse(res);
            // 检查过期
            if (res && res.iExpire < Date.now()) {
                del(sKey);  // 删除过期数据
                res = null;
            }

            return res;
        }
        function set(sKey, val) {
            var _val = val;

            if (typeof _val.iExpire !== 'number')
                throw new Error('Expire not found');
            if (typeof val === 'object') {
                _val = JSON.stringify(val);
            }
            oStorage.setItem(sKey, _val);
        }
        function del(sKey) {
            oStorage.removeItem(sKey);
        }

        function clear() {
            oStorage.clear();
        }

        return {
            get: get,
            set: set,
            del: del,
            clear: clear
        };
    })();

    function jsonp(sUrl, fCallback, oArgs, iExpire) {
        // 默认有效期60分钟
        iExpire = iExpire || Date.now() + 1000 * 60 * 60;

        // 拼接带参url
        if (typeof oArgs === 'object') {
            sUrl += '?';
            for (var key in oArgs) {
                if (oArgs.hasOwnProperty(key)) {
                    sUrl += encodeURIComponent(key) + '=' + encodeURIComponent(oArgs[key]) + '&';
                }
            }
            sUrl += 'callback=JSON_CALLBACK';
        }
        else {
            sUrl += '?callback=JSON_CALLBACK';
        }


        // 请求数据并缓存结果
        var _oCache = storage.get(sUrl) || {
            sState: 'OFF',
            aCallback: [fCallback],
            oData: null,
            iExpire: iExpire
        };
        if (_oCache.sState === 'OFF') {
console.log('no data, catch data now');
            _oCache.sState = 'ON';
            // 请求数据
            $http.jsonp(sUrl).success(function(res){
console.log(res.data);
                _oCache.oData = res.data;
                _oCache.sState = 'READY';

                // 执行回调
                if (_oCache.aCallback.length > 0) {
                    _oCache.aCallback.forEach(function(fn) {
                        fn(_oCache.oData);
                    });
                    _oCache.aCallback = [];
                }
                // localStorage缓存
                storage.set(sUrl, _oCache);
            }).error(function(err){
console.log('DataServ.jsonp: error occurs');
console.log(err);
                UIServ.toast('网络堵车了。。');
                // 请求失败，隐藏loading
                UIServ.loading(false);
            });
        }
        else if (_oCache.sState === 'ON') {
console.log('catching data, wait..');
            // 加入回调队列，等待请求返回
            _oCache.aCallback.push(fCallback);
        }
        else if (_oCache.sState === 'READY') {
console.log('data is ready, callback now');
            // 直接执行回调
console.log(_oCache.oData);
            fCallback(_oCache.oData);
        }
    }
    
    function getIndex(fCallback) {
        var sUrl = 'http://www.ayqy.net/app/rsshelper/index.php';
        // 首页列表缓存24小时
        jsonp(sUrl, fCallback, null, Date.now() + 1000 * 60 * 60 * 24);
    }

    function getRss(sUrl, fCallback) {
        var _sUrl = 'http://www.ayqy.net/app/rsshelper/rss.php';
        // rss缓存4小时
        jsonp(_sUrl, fCallback, {
            url: sUrl
        }, Date.now() + 1000 * 60 * 60 * 4);
    }

    function getHtml(sUrl, fCallback) {
        var _sUrl = 'http://www.ayqy.net/app/rsshelper/html.php';
        jsonp(_sUrl, fCallback, {
            url: sUrl
        });
    }

    // 内存临时字典
    var oDir = {
        // key: value
    };
    function save(val) {
        var sKey = Date.now() + '';
        oDir[sKey] = val;
        // store
//...

        // storage.set(sKey, val);

        return sKey;
    }

    function get(sKey, bFromStorage) {
        return oDir[sKey] || null;
    }

    return {
        index: getIndex,
        rss: getRss,
        html: getHtml,

        save: save,
        get: get
    };
}]);