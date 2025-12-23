import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import FindRide from './pages/FindRide';
import OfferRide from './pages/OfferRide';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/find-ride" element={<FindRide />} />
                            <Route path="/offer-ride" element={<OfferRide />} />
                        </Route>

                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </main>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
