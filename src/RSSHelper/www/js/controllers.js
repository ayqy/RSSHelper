angular.module('rsshelper.controllers', [])

.controller('TabCtrl', ['$scope', '$rootScope', '$sce', '$location', 'DataServ', 'UIServ',
        function($scope, $rootScope, $sce, $location, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var cate = $location.path().split('/').pop();
    DataServ.index(function(oData) {
        $scope.data = oData[cate + 's'];
        $scope.openInnerUrl = UIServ.openInnerUrl;

        // 隐藏loading
        UIServ.loading(false);
    });

    // 工具函数
    $rootScope.str2html = function(s) {
        return $sce.trustAsHtml(s);
    };
    $rootScope.dateFormat = function(dateString) {
        return new Date(dateString).toLocaleString();
    };
}])
.controller('SideMenuCtrl', ['$scope', 'DataServ', 'UIServ',
        function($scope, DataServ, UIServ) {
    $scope.cacheAll = function() {
        var res = {
            iTotal: 0,
            iSuccess: 0
        };

        var fCount = function() {
            res.iSuccess++;
        };
        var nextTick = function(fn) {
            setTimeout(fn, 50);
        };
        var reqData = function(oItem) {
            if (oItem.type === 'rss') {
                nextTick(function() {
                    DataServ.rss(oItem.url, fCount);
                    res.iTotal++;
                });
            }
            else if (oItem.type === 'html') {
                nextTick(function() {
                    DataServ.html(oItem.url, fCount);
                    res.iTotal++;
                });
            }
        };

        console.log('start to cache all url');
        DataServ.index(function(oData) {
            for (var sCateName in oData) {
                if (oData.hasOwnProperty(sCateName)) {
                    oData[sCateName].forEach(reqData);
                }
            }
        });
    };
}])

//---Master
.controller('MasterListCtrl', ['$scope', '$rootScope', '$stateParams', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    // 请求数据
    var id = $stateParams.masterId;
    DataServ.index(function(oData) {
        var master = oData.masters[id];

        if (master.type === 'rss') {
            DataServ.rss(master.url, function(oData) {
                $scope.data = oData;

                $scope.dateFormat = $rootScope.dateFormat;

                // 隐藏loading
                UIServ.loading(false);
            });
        }
        else if (master.type === 'html') {
            DataServ.html(master.url, function(oData) {
                $scope.data = oData;

                $scope.dateFormat = function(dateString) {
                    // 不转换html中的非标准格式date
                    return dateString;
                };

                // 隐藏loading
                UIServ.loading(false);
            });
        }

        $scope.str2html = $rootScope.str2html;
        $scope.onItemClicked = function(item) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/master/article/' + DataServ.save(item));
            }
        };
    });
}])

//---Blog
.controller('BlogListCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    // 请求数据
    var id = $stateParams.blogId;
    DataServ.index(function(oData) {
        var blog = oData.blogs[id];

        if (blog.type === 'rss') {
            DataServ.rss(blog.url, function(oData) {
                $scope.data = oData;

                $scope.dateFormat = $rootScope.dateFormat;

                // 隐藏loading
                UIServ.loading(false);
            });
        }
        else if (blog.type === 'html') {
            DataServ.html(blog.url, function(oData) {
                $scope.data = oData;

                $scope.str2html = $rootScope.str2html;
                // 不转换日期格式
                $scope.dateFormat = function(dateString) {
                    return dateString;
                };

                // 隐藏loading
                UIServ.loading(false);
            });
        }

        $scope.onItemClicked = function(item) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/blog/article/' + DataServ.save(item));
            }
        };
    });
}])

//---Weekly
.controller('WeeklyListCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var id = $stateParams.weeklyId;
    DataServ.index(function(oData) {
        var weekly = oData.weeklys[id];

        if (weekly.type === 'rss') {
            DataServ.rss(weekly.url, function(oData) {
                $scope.data = oData;
                
                $scope.str2html = $rootScope.str2html;
                $scope.dateFormat = $rootScope.dateFormat;

                // 隐藏loading
                UIServ.loading(false);
            });
        }
        // else if
        // ...暂无html周刊源
        
        $scope.onItemClicked = function(item) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/weekly/article/' + DataServ.save(item));
            }
        };
    });
}])

//---Joke
.controller('JokeListCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var id = $stateParams.jokeId;
    DataServ.index(function(oData) {
        var joke = oData.jokes[id];

        if (joke.type === 'html') {
            DataServ.html(joke.url, function(oData) {
                $scope.data = oData;

                $scope.openUrl = UIServ.openUrl;
                $scope.str2html = $rootScope.str2html;

                // 隐藏loading
                UIServ.loading(false);
            });
        }
        // else if
        // ...暂无rss笑话源
    });
}])

// common 3th level
.controller('ArticleContentCtrl', ['$scope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var dataKey = $stateParams.dataKey;
    var item = DataServ.get(dataKey);

    $scope.item = item;
    $scope.contentIsText = true;

    $scope.str2html = function(s) {
        // 是html
        if (isHtml(s)) {
            $scope.contentIsText = false;
            
            return $sce.trustAsHtml(s);
        }
    };
    $scope.dateFormat = function(dateString) {
        return new Date(dateString).toLocaleString();
    };
    $scope.openUrl = UIServ.openUrl;

    // 隐藏loading
    UIServ.loading(false);
}]);




//---custom func
function isHtml(s) {
    return /<(div)|(p)|(span)|(section)|(img)|(a)[^>]*>/i.test(s);
}