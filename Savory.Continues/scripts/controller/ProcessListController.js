function ProcessListController($scope, ContinuesService) {

    function process_items_callback(response) {

        if (response.status == 1) {
            $scope.processes = response.processes;
        }
    }

    function process_count_callback(response) {

        if (response.status == 1) {
            $scope.totalCount = response.totalCount;
        }
    }

    $scope.refresh = function () {

        {
            var request = {};
            request.pageIndex = $scope.currentPage;
            ContinuesService.process_items(request).then(process_items_callback);
        }

        {
            var request = {};
            ContinuesService.process_count(request).then(process_count_callback);
        }
    }

    //分页
    $scope.pageChanged = function () {

        var request = {};
        request.pageIndex = $scope.currentPage;
        ContinuesService.process_items(request).then(process_items_callback);
    };

    {

        $scope.maxSize = 10;
        $scope.currentPage = 1;
        $scope.pageIndex = 1;
        $scope.pageSize = 15;

        $scope.refresh();
    }
}