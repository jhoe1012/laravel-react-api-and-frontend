import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/assets/main.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/views/Home'
import Register from '@/views/auth/Register'
import { route } from '@/routes'
import VehiclesList from '@/views/vehicles/Vehicles'
import axios from 'axios'

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With']="XMLHttpRequest"
window.axios.defaults.withCredentials=true
window.axios.defaults.baseURL="http://laravel_react.test/api/v1"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path={route('register')} element={<Register />} />
          <Route path={route('vehicles.index')} element={<VehiclesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
