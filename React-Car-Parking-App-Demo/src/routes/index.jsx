const routeNames = {
  home: '/',
  register: '/register',
}

function route(name, params = {}) {
  let url = routeNames[name]

  for (const prop in params) {
    if (Object.prototype.hasOwnProperty.call(params, prop)) {
      url = url.replace(':${prop}', params[prop])
    }
  }

  return url
}

export { route }
