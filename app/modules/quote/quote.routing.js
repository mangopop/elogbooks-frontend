(function () {
    'use strict';

    angular
        .module('elogbooks.quote', [])
        .config(registerRoutes);

    function registerRoutes($stateProvider) {
        $stateProvider
            .state('quotes', {
                abstract: true,
                url: '/quotes',
                template: '<ui-view/>'
            })
            .state('quotes.list', {
                url: '/list',
                controller: 'QuoteListController',
                controllerAs: 'vm',
                templateUrl: '/modules/quote/list/list.html',
                resolve: {
                    quoteCollectionResponse: function ($http) {
                        return $http({
                            url: 'http://localhost:8001/quote',
                            method: "GET",
                            params: {}
                        }).then(function (response) {
                            console.log(response.data)
                            return response.data;
                        }, function () {
                            console.log('Request Failed');
                        });
                    }
                }
            })
    }
})();