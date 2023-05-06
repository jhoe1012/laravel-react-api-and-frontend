const routeNames = {
  'home': '/',
  'register': '/register',
  'profile.edit':'/profile',
  'profile.change-password':'/profile/change-password',
  'login':'/login',
  'vehicles.index' : '/vehicles',
  'parkings.active': '/parkings/active',
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
