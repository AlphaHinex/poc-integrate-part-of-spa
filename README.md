POC-Integrate-Part-of-SPA
=========================

集成单页面应用部分内容的可行性验证


基本思路
-------

主页面中有一个 `div` 用来加载需要集成的 `SPA` 中内容的代码片段，之后将加载完成的代码片段进行渲染，实现加载 `SPA` 应用中部分内容的效果


需求
----

1. 需被集成的应用提供其 `url` 前缀，如 `http://localhost:810`

1. 需被集成的应用提供其相关资源文件路径，如 `js` 和 `css`

1. [`AngularJS`] 需提供 `ng-app` 名称


用法
----

1. 引入 `jquery`

1. [`AngularJS`] 集成 `AngularJS` 应用需引入 [integrate-angularjs.js](integrate-angularjs.js)

1. [`AngularJS`] 加载代码片段并驱动页面渲染的函数如下。若被集成的页面在整个 `ng-view` 中，通过 `ngRoute` 实现前端页面切换，则无需传递后两个参数

        renderSnippet(ngAppName, urlPrefix, templateUrl)


约束
----

1. `SPA` 应用需允许跨域访问，需服务端在 `response` 上设置 `header`：`Access-Control-Allow-Origin:*`

    > 以 `python3 http server` 为例，可通过修改 `$PYTHON_HOME/Lib/http/server.py`，在 `end_headers` 函数中增加如下内容：`self.send_header('Access-Control-Allow-Origin', '*')`

1. [`AngularJS`] 模板（代码片段）需以独立文件的方式存在，如 `html` 或 `js`，以便集成时直接通过 `url` 访问

1. [`AngularJS`] `ng-include` 只能以属性方式使用，不能以元素或 class 方式使用。支持的使用方式为：

        <div class="col-md-2" ng-include src="'views/main/pubinfo/subjects.html'"></div>
        <div class="col-md-2" ng-include="'views/main/pubinfo/subjects.html'"></div>

1. [`AngularJS`] 若被集成的页面在整个 `ng-view` 中，通过 `ngRoute` 实现前端页面切换，则需要修改相关路由配置，并放宽 `templateUrl` 的访问限制（集成时需使用修改后的配置文件）。可参考 `todomvc-angular` 演示项目中的 [app.js](todomvc-angular/js/app.js) 和 [app-for-integrate.js](todomvc-angular/js/app-for-integrate.js)

        $ diff app.js app-for-integrate.js
        14c14
        <                       templateUrl: 'templates/todomvc-index.html',
        ---
        >                       templateUrl: 'http://localhost:811/templates/todomvc-index.html',
        31a32,36
        >       });
        >
        > angular.module('todomvc')
        >       .config(function($sceDelegateProvider){
        >               $sceDelegateProvider.resourceUrlWhitelist(['**']);


演示效果
-------

以 `python3 http server` 为例

1. 将 [angular-spa](angular-spa) 演示应用发布至 `http://localhost:810`

        $ cd angular-spa
        $ py -m http.server 810 &

1. 将 [todomvc-angular](todomvc-angular) 演示应用发布至 `http://localhost:811`

        $ cd todomvc-angular
        $ py -m http.server 811 &

1. 浏览器访问 [index-angular.html](index-angular.html)