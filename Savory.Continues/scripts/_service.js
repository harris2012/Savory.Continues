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