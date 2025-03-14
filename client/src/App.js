import React, { useEffect } from 'react'
import Body from './pages/body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { bodyRoutes } from './utils/BodyRoutes';
import Dashboard from './components/admin/dashboard';
import NotFound from './pages/notfound';

function App() {
  console.log(Object.entries(bodyRoutes))
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        {Object.entries(bodyRoutes).map(([category, routes]) =>
          routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        )}
      </Route>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
