import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"

import Layout from './Components/Layout';
import Home from './Pages/Home';
import HostLayout from './Components/HostLayout';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route 
      path="host" 
      element={<HostLayout />} 
    />
    {/* <Route 
      path="livenews" 
      element={<LiveNews />} 
    />
    <Route
      path="search"
      element={<Search />}
      errorElement={<Error />}
      loader={vansLoader}
    /> */}
    <Route
      path="login"
      element={<Login />}
    />
    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}