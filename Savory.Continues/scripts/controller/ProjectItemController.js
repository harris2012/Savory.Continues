function ProjectItemController($scope, $state, $stateParams, $uibModal, ContinuesService) {

    $scope.name = $stateParams.name;
    if (!$scope.name) {
        $state.go('continues.project.list');
    }
    $scope.title = $scope.name;

    function project_item_callback(response) {

        if (response.status == 1) {
            $scope.title = response.project.name;
            $scope.project = response.project;
        }
    }

    function build_setup_callback(response) {

        if (response.status == 1) {
            swal({ title: "成功", text: "初始化成功", timer: 500, showConfirmButton: false, type: "success" });
        } else {
            swal({ title: "失败", text: response.message, type: "error" });
        }
    }

    //初始化
    $scope.setup = function () {

        var request = {};
        request.name = $scope.project.name;
        ContinuesService.build_setup(request).then(build_setup_callback);
    }
    //立即构建
    $scope.triggerBuild = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/scripts/view/view_build_create.html?v=' + window.version,
            controller: BuildCreateController,
            size: 'lg',
            keyboard: false, backdrop: 'static',
            resolve: {
                name: function () { return $scope.project.name; }
            }
        });

        modalInstance.result.then(function (response) { window.open(window.jenkinsHost + '/job/' + $scope.name) }, function (response) { console.log(response); });
    }

    {
        var request = {};
        request.name = $scope.name;
        ContinuesService.project_item(request).then(project_item_callback);
    }
}