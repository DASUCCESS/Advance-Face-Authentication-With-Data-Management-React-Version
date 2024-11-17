import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ApiHelper/RouteProtection';
import PublicRoute from './ApiHelper/RedirectRoute';

function App() {

    useEffect(() => {
      document.body.style.background = 'linear-gradient(0deg, #E5E5E5, #ffffff)';
      return () => {
        document.body.style.background = ''; 
      };
    }, []);
    return (
        <Router>
                <Routes >
                    <Route path="/" element={<LandingPage />} />

                    {/* Using the restricted redirect route here */}
                    <Route path="/signup" element={ <PublicRoute><SignupForm /></PublicRoute>} />
                    <Route path="/login" element={<PublicRoute>< LoginForm /></PublicRoute>} />

                    {/* Using the protected route here */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
        </Router>
    );
}

export default App;
