function BuildCreateController($scope, ContinuesService, $uibModalInstance, name) {

    $scope.name = name;
    $scope.branch = "master";
    $scope.version = moment().format('YYYYMMDDHHmmss');

    function build_create_callback(response) {

        $scope.waiting = false;

        if (response.status == 1) {
            $uibModalInstance.close("success");
        }
        else {
            $scope.message = response.message;
        }
    }

    $scope.confirmCreateVersion = function () {

        $scope.waiting = true;
        $scope.message = null;

        var request = {};
        request.name = $scope.name;
        request.branch = $scope.branch;
        request.version = $scope.version;
        ContinuesService.build_create(request).then(build_create_callback)
    }

    //关闭窗口
    $scope.closeDialog = function () {

        $uibModalInstance.dismiss("取消新增版本");
    }
}