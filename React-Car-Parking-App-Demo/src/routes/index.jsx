const routeNames = {
    'home': '/',
    'register': '/register',
    'login':'/login',
    'profile.edit':'/profile',
    'profile.change-password':'/profile/change-password',
    'vehicles.index' : '/vehicles',
    'vehicles.create':'/vehicles/create',
    'vehicles.edit':'/vehicle/:id/edit',
    'parkings.active': '/parkings/active',
    'parkings.history':'/parkings/history',
    'parkings.create': '/parkings/new',
    'parkings.show':'/parkings/:id',
}

function route(name, params = {}) {
    let url = routeNames[name]

    for (const prop in params) {
        if (Object.prototype.hasOwnProperty.call(params, prop)) {
            url = url.replace(`:${prop}`, params[ prop ])
        }
    }

    return url
}

export { route }
