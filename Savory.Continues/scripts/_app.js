var app = angular.module('app', ['ngResource', 'ui.router', 'ui.bootstrap', 'ui.sortable']);

//Config
app.config(ContinuesRoute);

// Service
app.service('ContinuesService', ['$resource', '$q', ContinuesService]);
