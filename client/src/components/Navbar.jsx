import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <Package className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-extrabold text-navy tracking-tight">Gronur</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/cart" className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-2xl text-navy transition-all duration-300">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link to="/orders" className="text-navy/70 hover:text-navy font-semibold transition-colors flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                <span className="hidden sm:inline">Orders</span>
                            </Link>

                            {user.role === 'admin' && (
                                <Link to="/admin/products" className="text-navy/70 hover:text-navy font-semibold transition-colors flex items-center gap-2">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="hidden sm:inline">Admin</span>
                                </Link>
                            )}

                            <div className="flex items-center gap-3 bg-slate-100 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 group relative">
                                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-navy font-bold text-sm hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-navy hover:bg-navy-light text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-navy/20 active:scale-95">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
