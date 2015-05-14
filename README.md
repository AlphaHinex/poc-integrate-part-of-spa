POC-Integrate-Part-of-SPA
=========================

集成单页面应用部分内容的可行性验证


基本思路
-------

主页面中有一个 `div` 用来加载需要集成的 `SPA` 中内容的代码片段，之后将加载完成的代码片段进行渲染，实现加载 `SPA` 应用中部分内容的效果


约束
----

1. `SPA` 应用需允许跨域访问，需服务端在 `response` 上设置 `header`：`Access-Control-Allow-Origin:*`

    > 以 `python3 http server` 为例，可通过修改 `$PYTHON_HOME/Lib/http/server.py`，在 `end_headers` 函数中增加如下内容：`self.send_header('Access-Control-Allow-Origin', '*')`

2. [`AngularJS`] `ng-include` 只能以属性方式使用，不能以元素或 class 方式使用。支持的使用方式为：

        <div class="col-md-2" ng-include src="'views/main/pubinfo/subjects.html'"></div>
        <div class="col-md-2" ng-include="'views/main/pubinfo/subjects.html'"></div>


演示效果
-------

1. 先将 [angular-spa](angular-spa) 演示应用发布至 `http://localhost:810`，以 `python3 http server` 为例：

        $ cd angular-spa
        $ py -m http.server 810 &

2. 浏览器访问 [index-angular.html](index-angular.html)