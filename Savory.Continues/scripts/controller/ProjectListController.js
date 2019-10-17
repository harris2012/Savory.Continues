function ProjectListController($scope, ContinuesService, $uibModal) {

    function app_items_callback(response) {

        if (response.status == 1) {
            $scope.projects = response.projects;
        }
    }

    function app_count_callback(response) {

        if (response.status == 1) {
            $scope.totalCount = response.totalCount;
        }
    }

    $scope.refresh = function () {

        {
            var request = {};
            request.pageIndex = $scope.currentPage;
            ContinuesService.project_items(request).then(app_items_callback);
        }

        {
            var request = {};
            ContinuesService.project_count(request).then(app_count_callback);
        }
    }

    //分页
    $scope.pageChanged = function () {

        var request = {};
        request.pageIndex = $scope.currentPage;
        ContinuesService.project_items(request).then(app_items_callback);
    };

    {

        $scope.maxSize = 10;
        $scope.currentPage = 1;
        $scope.pageIndex = 1;
        $scope.pageSize = 15;

        $scope.refresh();
    }
}