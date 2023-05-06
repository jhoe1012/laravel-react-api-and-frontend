import App from '@/App'
import '@/assets/main.css'
import { route } from '@/routes'
import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import ActiveParkings from '@/views/parkings/ActiveParkings'
import EditProfile from '@/views/profile/EditProfile'
import VehiclesList from '@/views/vehicles/Vehicles'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest'
window.axios.defaults.withCredentials=true
window.axios.defaults.baseURL='http://laravel_react.test/api/v1'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path={route('register')} element={<Register />} />
          <Route path={route('login')} element={<Login />} />
          <Routes path={route('profile.edit')} element={<EditProfile />} />
          <Route path={route('vehicles.index')} element={<VehiclesList />} />
          <Route path={route('parkings.active')} element={<ActiveParkings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
