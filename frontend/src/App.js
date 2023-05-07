import React, { useState } from 'react';
import Dashboard from './dashboard/dashboard';
import SignupPage from './signup-page/signup-page';
import LoginPage from './login-page/login-page';
import { Routes, Route , Navigate   } from 'react-router-dom';



function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    <>
       <Routes>
       <Route path="/" element={<LoginPage />} />
       <Route path="/LoginPage" render={() => isAuthenticated ? <Navigate  to="/dashboard" /> : <LoginPage />} />
      <Route path="/SignupPage" element={<SignupPage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
    {/* <Router>
      <Switch>
        <Route path="/LoginPage" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router> */}
  {/* <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <div>
          <SignupPage />
          <LoginPage />
        </div>
      )}
    </div> */}
      </>
  );
}

export default App;