function ContinuesService($resource, $q) {

    var resource = $resource('', {}, {
        project_items: { method: 'POST', url: '/api/project/items' },
        project_item: { method: 'POST', url: '/api/project/item' },
        project_count: { method: 'POST', url: '/api/project/count' },
        project_create: { method: 'POST', url: '/api/project/create' },
        project_update: { method: 'POST', url: '/api/project/update' },

        build_setup: { method: 'POST', url: '/api/build/setup' },
        build_create: { method: 'POST', url: '/api/build/create' },

        process_items: { method: 'POST', url: '/api/process/items' },
        process_item: { method: 'POST', url: '/api/process/item' },
        process_count: { method: 'POST', url: '/api/process/count' },
        process_create: { method: 'POST', url: '/api/process/create' },
        process_update: { method: 'POST', url: '/api/process/update' }
    });

    return {
        project_items: function (request) { var d = $q.defer(); resource.project_items({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        project_item: function (request) { var d = $q.defer(); resource.project_item({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        project_count: function (request) { var d = $q.defer(); resource.project_count({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        project_create: function (request) { var d = $q.defer(); resource.project_create({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        project_update: function (request) { var d = $q.defer(); resource.project_update({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },

        build_setup: function (request) { var d = $q.defer(); resource.build_setup({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        build_create: function (request) { var d = $q.defer(); resource.build_create({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },

        process_items: function (request) { var d = $q.defer(); resource.process_items({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        process_item: function (request) { var d = $q.defer(); resource.process_item({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        process_count: function (request) { var d = $q.defer(); resource.process_count({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        process_create: function (request) { var d = $q.defer(); resource.process_create({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },
        process_update: function (request) { var d = $q.defer(); resource.process_update({}, request, function (result) { d.resolve(result); }, function (result) { d.reject(result); }); return d.promise; },

    }
}
function WelcomeController($scope) {
}
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
function ProjectUpdateController($scope, $state, $stateParams, ContinuesService) {

    $scope.name = $stateParams.name;
    if (!$scope.name) {
        $state.go('continues.project.list');
    }
    $scope.title = $scope.name;

    function process_items_callback(response) {

        if (response.status == 1) {
            $scope.processes = response.processes;
        }
    }

    function project_item_callback(response) {

        if (response.status == 1) {
            $scope.project = response.project;
        }
    }

    function project_update_callback(response) {
        if (response.status == 1) {
            swal({ title: "提示信息", text: "更新成功", type: "success", timer: 1000, showConfirmButton: false });
            $state.go('continues.project.item', { name: $scope.name });
        }
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
    $scope.confirmUpdate = function () {

        var request = {};
        request.project = $scope.project;

        ContinuesService.project_update(request).then(project_update_callback);
    }


    {
        var request = {};
        request.pageIndex = 1;
        ContinuesService.process_items(request).then(process_items_callback);
    }
    {
        var request = {};
        request.name = $scope.name;
        ContinuesService.project_item(request).then(project_item_callback);
    }
}
function BuildListController() {

}
function BuildItemController() {

}
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
var ContinuesRoute = function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/welcome').when('/', '/welcome');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.state('continues', {
        url: '/'
    });

    //欢迎页
    $stateProvider.state('continues.welcome', { url: 'welcome', templateUrl: '/scripts/view/view_welcome.html?v=' + window.version, controller: WelcomeController });
    $stateProvider.state('continues.404', { url: '404', templateUrl: '/scripts/view/view_404.html?v=' + window.version });

    //app
    $stateProvider.state('continues.project', {});
    $stateProvider.state('continues.project.list', { url: 'project-list', templateUrl: '/scripts/view/view_project_list.html?v=' + window.version, controller: ProjectListController });
    $stateProvider.state('continues.project.item', { url: 'project-item/:name', templateUrl: '/scripts/view/view_project_item.html?v=' + window.version, controller: ProjectItemController });
    $stateProvider.state('continues.project.create', { url: 'project-create', templateUrl: '/scripts/view/view_project_create.html?v=' + window.version, controller: ProjectCreateController });
    $stateProvider.state('continues.project.update', { url: 'project-update/:name', templateUrl: '/scripts/view/view_project_update.html?v=' + window.version, controller: ProjectUpdateController });

    //build
    $stateProvider.state('continues.build', {});
    $stateProvider.state('continues.build.list', { url: 'build-list', templateUrl: '/scripts/view/view_build_list.html?v=' + window.version, controller: BuildListController });
    $stateProvider.state('continues.build.item', { url: 'build-item', templateUrl: '/scripts/view/view_build_item.html?v=' + window.version, controller: BuildItemController });

    //template
    $stateProvider.state('continues.process', {});
    $stateProvider.state('continues.process.list', { url: 'process-list', templateUrl: '/scripts/view/view_process_list.html?v=' + window.version, controller: ProcessListController });
    $stateProvider.state('continues.process.create', { url: 'process-create', templateUrl: '/scripts/view/view_process_create.html?v=' + window.version, controller: ProcessCreateController });
    $stateProvider.state('continues.process.item', { url: 'process-item/:name', templateUrl: '/scripts/view/view_process_item.html?v=' + window.version, controller: ProcessItemController });
    $stateProvider.state('continues.process.update', { url: 'process-update/:name', templateUrl: '/scripts/view/view_process_update.html?v=' + window.version, controller: ProcessUpdateController });
}
var app = angular.module('app', ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.sortable']);

//Config
app.config(ContinuesRoute);

// Service
app.service('ContinuesService', ['$resource', '$q', ContinuesService]);