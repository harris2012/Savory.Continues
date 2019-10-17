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