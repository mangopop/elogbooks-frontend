(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobUpdateController', ['jobResponse','$http', '$state', '$stateParams', JobUpdateController]);

    function JobUpdateController(jobResponse, $http, $state,$stateParams) {
        var vm = this;
        vm.job = jobResponse
        vm.update = update;

        function update() {
            $http.put(
                'http://localhost:8001/job/' + $stateParams.id,
                {'description':vm.job.description}
            ).then(function (response) {
                $state.go('jobs.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
