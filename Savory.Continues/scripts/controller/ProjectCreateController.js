function ProjectCreateController($scope, $state, ContinuesService) {

    $scope.project = {};

    function process_items_callback(response) {

        if (response.status == 1) {
            $scope.processes = response.processes;
        }
    }

    function project_create_callback(response) {

        if (response.status != 1) {

            swal({ title: "提示信息", text: response.message, type: "error" });
            return;
        }

        swal({ title: "提示信息", text: "创建成功", type: "success", timer: 1000, showConfirmButton: false });
        $state.go('continues.project.list');
    }

    $scope.selectProcess = function (process) {
        $scope.project.templateName = process.name;
        $scope.process = process;

        if (process.params != null && process.params.length > 0) {
            var params = [];

            for (var i = 0; i < process.params.length; i++) {

                var param = {};
                param.key = process.params[i].key;
                param.defaultValue = process.params[i].defaultValue;
                param.description = process.params[i].description;
                param.value = process.params[i].defaultValue;

                params.push(param);
            }
            $scope.project.params = params;
        }
    }
    $scope.confirmCreate = function () {

        var request = {};
        request.project = $scope.project;

        ContinuesService.project_create(request).then(project_create_callback);
    }

    {
        var request = {};
        request.pageIndex = 1;
        ContinuesService.process_items(request).then(process_items_callback);
    }
}