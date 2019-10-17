function ProcessUpdateController($scope, $state, $stateParams, ContinuesService) {

    $scope.name = $stateParams.name;
    if (!$scope.name) {
        $state.go('continues.process.list');
    }
    $scope.title = $scope.name;

    function process_item_callback(response) {

        if (response.status == 1) {
            $scope.process = response.process;
        }
    }

    function process_update_callback(response) {
        if (response.status == 1) {
            swal({ title: "提示信息", text: "更新成功", type: "success", timer: 1000, showConfirmButton: false });
            $state.go('continues.process.item', { name: $scope.name });
        }
    }

    {
        var request = {};
        request.name = $scope.name;
        ContinuesService.process_item(request).then(process_item_callback);
    }

    $scope.addStep = function () {

        if ($scope.process.steps == null) {
            $scope.process.steps = [];
        }

        $scope.process.steps.push({});
    }

    $scope.removeStep = function (step) {

        for (var i = 0; i < $scope.process.steps.length; i++) {
            if ($scope.process.steps[i] == step) {
                $scope.process.steps.splice(i, 1);
            }
        }
    }

    $scope.addParam = function () {

        if ($scope.process.params == null) {
            $scope.process.params = [];
        }

        $scope.process.params.push({});
    }


    $scope.removeParam = function (param) {

        for (var i = 0; i < $scope.process.params.length; i++) {
            if ($scope.process.params[i] == param) {
                $scope.process.params.splice(i, 1);
            }
        }
    }

    $scope.confirmUpdate = function () {

        var request = {};
        request.process = $scope.process;

        ContinuesService.process_update(request).then(process_update_callback);
    }
}