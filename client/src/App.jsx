import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user && user.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow container mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Protected Routes */}
                                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                                <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                                <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
                                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                                {/* Admin Routes */}
                                <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                            </Routes>
                        </main>
                        <Footer />
                        <Toaster position="bottom-right" />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
