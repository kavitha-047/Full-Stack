import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
                    <ShoppingBag className="w-12 h-12" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-navy tracking-tight">Your cart is empty</h2>
                    <p className="text-slate-400 font-medium italic">Looks like you haven't added anything yet.</p>
                </div>
                <Link to="/" className="btn-primary-navy shadow-xl shadow-navy/10 flex items-center gap-2">
                    Discover Items <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <h1 className="text-4xl font-black text-navy tracking-tight">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-[2rem] card-shadow border border-slate-50 flex items-center gap-6 group transition-all hover:bg-slate-50/50">
                            <Link to={`/product/${item._id}`} className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </Link>

                            <div className="flex-grow space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.category}</p>
                                <Link to={`/product/${item._id}`}>
                                    <h3 className="text-xl font-bold text-navy hover:text-accent transition-colors">{item.title}</h3>
                                </Link>
                                <p className="text-accent font-black text-lg">₹{item.price.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                <button
                                    onClick={() => addToCart(item, -1)}
                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-navy hover:text-red-500 transition-colors"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-extrabold text-navy text-sm w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => addToCart(item, 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-navy hover:text-primary transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="space-y-6">
                    <div className="bg-navy rounded-[3rem] p-8 text-white shadow-2xl shadow-navy/20 relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 border-b border-white/10 pb-6">
                                    <div className="flex justify-between font-medium opacity-60">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium opacity-60">
                                        <span>Delivery</span>
                                        <span className="text-primary font-bold">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold opacity-60">Total amount</span>
                                    <span className="text-4xl font-black">₹{cartTotal.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-accent hover:bg-accent/90 text-white py-5 rounded-[2rem] font-bold text-lg transition-all shadow-xl shadow-accent/10 active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    Checkout <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>

                            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-navy shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-xs font-bold text-slate-400 leading-none mb-1 uppercase tracking-widest">Delivery to</p>
                            <p className="text-navy font-bold truncate">Set your address in checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
