


import React from 'react';

import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
  //console.log(props)
  const token = localStorage.getItem('token');

  if (token) {
    return props.children; 
    //baiscally dashboarddd comes under it so allow redirect..so
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
