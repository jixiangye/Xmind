define(function(require,exports,module){
    require('angular');
    
    angular
        .module("utils",[])
        .factory("$ajax",["$http",function($http){
            return function(config){
            	config.url = "../../"+config.url;
                var promise = $http(config);
                    
                promise.success = function(fn){
                    promise.then(function(response) {
                        if(response.data.success)
                            fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                
                promise.fail = function(fn){
                    promise.then(function(response) {
                        if(!response.data.success){
                            fn(response.data, response.status, response.headers, config);
                        }
                    });
                    return promise;
                };
                
                promise.error = function(fn){
                    promise.then(null, function(response) {
                      fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                
                return promise;
            };
        }]);
});