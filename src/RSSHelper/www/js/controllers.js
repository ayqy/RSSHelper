angular.module('rsshelper.controllers', [])

// tab页通用ctrl
.controller('TabCtrl', ['$scope', '$stateParams', 'DataServ', 'UIServ',
        function($scope, $stateParams, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var cate = $stateParams.cate;
    DataServ.index(function(oData) {
        $scope.data = oData[cate];

        $scope.onItemClicked = function(listId) {
            UIServ.openInnerUrl('/tab/' + cate + '/' + listId, {cate: cate});
        };

        // 隐藏loading
        UIServ.loading(false);
    });
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
.controller('NavBarCtrl', ['$scope', '$rootScope', 'UIServ',
        function($scope, $rootScope, UIServ) {

        $rootScope.share = UIServ.openUrl;
}])


//---Master
.controller('MasterListCtrl', ['$scope', '$rootScope', '$stateParams', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();
    
    var cate = $stateParams.cate;
    var listId = $stateParams.listId;
    // 请求数据
    DataServ.index(function(oData) {
        var list = oData[cate][listId];

        if (list.type === 'rss') {
            DataServ.rss(list.url, function(oData) {
                $scope.data = oData;

                $scope.dateFormat = $rootScope.dateFormat;

                // 隐藏loading
                UIServ.loading(false);
            });
        }
        else if (list.type === 'html') {
            DataServ.html(list.url, function(oData) {
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
        $scope.onItemClicked = function(item, index) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/' + cate + '/' + listId + '/' + index, {cate: cate});
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
    var listId = $stateParams.listId;
    var cate = $stateParams.cate;
    DataServ.index(function(oData) {
        var blog = oData[cate][listId];

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

        $scope.onItemClicked = function(item, index) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/' + cate + '/' + listId + '/' + index, {cate: cate});
            }
        };
    });
}])

//---Weekly
.controller('WeeklyListCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var listId = $stateParams.listId;
    var cate = $stateParams.cate;
    DataServ.index(function(oData) {
        var weekly = oData[cate][listId];

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
        
        $scope.onItemClicked = function(item, index) {
            if (item.content === '') {
                UIServ.openUrl(item.link);
            }
            else {
                UIServ.openInnerUrl('/tab/' + cate + '/' + listId + '/' + index);
            }
        };
    });
}])

//---Joke
.controller('JokeListCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var listId = $stateParams.listId;
    var cate = $stateParams.cate;
    DataServ.index(function(oData) {
        var joke = oData[cate][listId];

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
.controller('ArticleContentCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', 'DataServ', 'UIServ',
        function($scope, $rootScope, $stateParams, $sce, DataServ, UIServ) {
    // 显示loading
    UIServ.loading();

    var cate = $stateParams.cate;
    var listId = $stateParams.listId;
    var itemId = $stateParams.itemId;

    var render = function(item) {
        $scope.item = item;

        $scope.str2html = $rootScope.str2html;
        $scope.dateFormat = $rootScope.dateFormat;
        $scope.openUrl = UIServ.openUrl;

        // 隐藏loading
        UIServ.loading(false);
        // 内容页支持分享
        $rootScope.articleUrl = item.link;
        $rootScope.enableShare = true;
        $scope.$on("$destroy", function(){
            $rootScope.enableShare = false;
            $rootScope.articleUrl = '';
        });
    };

    DataServ.index(function(oData) {
        var list = oData[cate][listId];
        if (list.type === 'rss') {
            DataServ.rss(list.url, function(oData) {
                var item = oData.items[itemId];
                render(item);
                // 隐藏loading
                UIServ.loading(false);
            });
        }
        else if (list.type === 'html') {
            DataServ.html(list.url, function(oData) {
                var item = oData.items[itemId];
                render(item);
                // 隐藏loading
                UIServ.loading(false);
            });
        }
    });
}]);