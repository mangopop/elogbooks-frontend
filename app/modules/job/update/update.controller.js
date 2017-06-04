(function () {
    'use strict';

    angular
        .module('elogbooks.job')
        .controller('JobUpdateController', ['jobResponse','$http', '$state', '$stateParams', JobUpdateController]);

    function JobUpdateController(jobResponse, $http, $state,$stateParams) {
        var vm = this;
        vm.job = jobResponse
        vm.update = update;

        vm.status = {};
        vm.progress = {};
        vm.selectCtrl = {};

        vm.status.options = ["0","1"];
        vm.status.selected = String(vm.job.status); //model not defaulting if using a number!? Must investigate...

        vm.progress.options = [0,1];
        vm.progress.selected = String(vm.job.inProgress);




        function update() {

            delete vm.job.id;
            vm.job.status = Number(vm.status.selected);
            vm.job.inProgress = Number(vm.progress.selected);
            console.log(vm.job);

            $http.put(
                'http://localhost:8001/job/' + $stateParams.id, vm.job
            ).then(function (response) {
                $state.go('jobs.view', {id:response.data.id});
            }, function () {
                console.log('Request Failed');
            });
        }
    }
})();
