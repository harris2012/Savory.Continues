function ProcessItemController($scope, $state, $stateParams, ContinuesService) {

    $scope.name = $stateParams.name;
    if (!$scope.name) {
        $state.go('continues.process.list');
    }
    $scope.title = $scope.name;

    function process_item_callback(response) {

        if (response.status == 1) {
            $scope.title = response.process.name;
            $scope.process = response.process;
        }
    }

    {
        var request = {};
        request.name = $scope.name;
        ContinuesService.process_item(request).then(process_item_callback);
    }
}