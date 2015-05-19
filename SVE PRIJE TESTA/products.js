angular.module("exampleApp", ["increment", "ngResource", "ngRoute","ngAnimate"])
    .constant("baseUrl", "http://localhost:5500/products/")
    .factory("productsResource", function($resource, baseUrl){
        return $resource(baseUrl + ":id", {id: "@id"}, {create: {method: "POST"}, save: {method: "PUT"}});
    })
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when("/list", { templateUrl: "/angularjs/tableView.html" });
        $routeProvider.when("/edit/:id", { templateUrl: "/angularjs/editorView.html", controller: "editCtrl" });
        $routeProvider.when("/edit/:id/:data*", { templateUrl: "/angularjs/editorView.html" });
        $routeProvider.when("/create", { templateUrl: "/angularjs/editorView.html", controller: "editCtrl" });
        $routeProvider.otherwise({
            templateUrl: "/angularjs/tableView.html",
            controller: "tableCtrl",
            resolve: {
                data: function (productsResource) {
                    return productsResource.query()
                }
            }
        });
    })
.controller("defaultCtrl", function ($scope, $location, productsResource) {

    //$scope.productsResource = $resource(baseUrl + ":id", { id: "@id" }, { create: { method: "POST" }, save: { method: "PUT" } });
    //$scope.listProducts = function () {

    //    $scope.products = $scope.productsResource.query();

    //}
  
    $scope.data = {};
    $scope.deleteProduct = function (product) {
        //$http({
        //    method: "DELETE",
        //    url: baseUrl + product.id
        //}).success(function () {
        //    $scope.products.splice($scope.products.indexOf(product), 1);
        //});
        product.$delete().then(function () {
            $scope.data.products.splice($scope.data.products.indexOf(product), 1);
        });
        $location.path("/list");
    }

    $scope.createProduct = function (product) {
        //  $http.post(baseUrl, product).success(function (newProduct) {
        new productsResource(product).$create().then(function (newProduct) {
            $scope.data.products.push(newProduct);
            $location.path("/list");
        });
    }
   
})
    .controller("tableCtrl", function($scope, $location, $route, data){
        $scope.data.products = data;
        $scope.refreshProducts = function () {
            $route.reload();
        }
    })
.controller("editCtrl", function ($scope, $routeParams, $location) {
    $scope.currentProduct = null;

    if ($location.path().indexOf("/edit/") == 0) {
        var id = $routeParams["id"];
        for (var i = 0; i < $scope.data.products.length; i++) {
            if ($scope.data.products[i].id == id) {
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    }
    $scope.cancelEdit = function () {
        //if ($scope.currentProduct && $scope.currentProduct.$get) {
        //    $scope.currentProduct.$get();
        //}
        //$scope.currentProduct = {};
        $location.path("/list");
    }

    $scope.updateProduct = function (product) {
        //$http({
        //    url: baseUrl + product.id,
        //    method: "PUT",
        //    data: product
        //}).success(function (modifiedProduct) {
        //    for (var i = 0; i < $scope.products.length; i++) {
        //        if ($scope.products[i].id == modifiedProduct.id) {
        //            $scope.products[i] = modifiedProduct;
        //            break;
        //        }
        //    }
        product.$save();
        $location.path("/list");

    }
});