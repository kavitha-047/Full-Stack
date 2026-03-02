import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ChevronRight, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API from '../api/api';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        house: '',
        street: '',
        city: '',
        pincode: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    title: item.title,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item._id
                })),
                shippingAddress: address,
                paymentMethod: 'COD',
                totalPrice: cartTotal
            };

            await API.post('/orders', orderData);
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/orders');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/cart')} className="p-3 bg-white rounded-2xl shadow-sm text-navy hover:text-accent transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-4xl font-black text-navy tracking-tight">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Address & Payment */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-navy flex items-center gap-3 italic">
                            <span className="w-8 h-8 bg-navy text-white text-sm not-italic flex items-center justify-center rounded-xl">1</span>
                            Shipping Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[3rem] card-shadow border border-slate-50">
                            <div className="col-span-2 space-y-2">
                                <input
                                    type="text"
                                    placeholder="House / Flat No."
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                    value={address.house}
                                    onChange={(e) => setAddress({ ...address, house: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <input
                                    type="text"
                                    placeholder="Street / Area Name"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="City"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Pincode (6 digits)"
                                    required
                                    pattern="\d{6}"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-navy flex items-center gap-3 italic">
                            <span className="w-8 h-8 bg-navy text-white text-sm not-italic flex items-center justify-center rounded-xl">2</span>
                            Payment Method
                        </h3>
                        <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-4">
                            <div className="flex items-center justify-between p-6 bg-navy text-white rounded-[2rem] border-2 border-navy relative overflow-hidden group">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black">Cash on Delivery</p>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Pay when you receive</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="text-primary w-8 h-8 relative z-10" />
                                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            </div>

                            <div className="flex items-center justify-between p-6 bg-slate-50 text-slate-300 rounded-[2rem] border border-slate-100 opacity-60">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-navy">Credit / Debit Card</p>
                                        <p className="text-xs font-bold uppercase tracking-widest">Unavailable in Beta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Summary & Order Button */}
                <div className="lg:sticky lg:top-32 h-fit space-y-8">
                    <div className="bg-white rounded-[3rem] p-8 card-shadow border border-slate-50 space-y-8">
                        <h3 className="text-2xl font-black text-navy">Order Summary</h3>
                        <div className="space-y-4 border-b border-slate-50 pb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                                        <div>
                                            <p className="font-bold text-navy truncate max-w-[150px]">{item.title}</p>
                                            <p className="text-xs font-bold text-slate-400">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-navy">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 border-b border-slate-50 pb-8">
                            <div className="flex justify-between font-bold text-slate-400">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-slate-400">
                                <span>Shipping</span>
                                <span className="text-primary underline font-black">Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <span className="text-slate-400 font-bold">Total to pay</span>
                            <span className="text-4xl font-black text-navy tracking-tighter">${cartTotal.toFixed(2)}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-[2rem] font-bold text-xl transition-all shadow-2xl shadow-accent/20 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Confirm Order <ChevronRight className="w-6 h-6" /></>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
