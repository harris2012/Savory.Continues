function ProcessCreateController($scope, $state, ContinuesService) {

    $scope.process = {};

    function process_create_callback(response) {
        if (response.status == 1) {
            swal({ title: "提示信息", text: "创建成功", type: "success", timer: 1000, showConfirmButton: false });
            $state.go('continues.process.list');
        }
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
    $scope.confirmCreate = function () {

        var request = {};
        request.process = $scope.process;

        ContinuesService.process_create(request).then(process_create_callback);
    }
}