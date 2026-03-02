import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Package, MapPin, Clock, CheckCircle2, Truck, Box, Smartphone } from 'lucide-react';
import API from '../api/api';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await API.get(`/orders/my`);
                const foundOrder = data.find(o => o._id === id);
                setOrder(foundOrder);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!order) return <div className="text-center py-20">Order not found.</div>;

    const steps = ['Placed', 'Confirmed', 'Processing', 'Delivered'];
    const currentStepIndex = steps.indexOf(order.status);

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <Link to="/orders" className="inline-flex items-center gap-2 p-3 bg-white rounded-2xl text-navy font-bold shadow-sm hover:shadow-md transition-all">
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Orders</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Tracking Order</p>
                    <h1 className="text-4xl font-black text-navy tracking-tight">#{order._id.slice(-8).toUpperCase()}</h1>
                </div>
                <div className="text-navy font-bold flex items-center gap-2 bg-slate-100 px-6 py-3 rounded-2xl">
                    <Clock className="w-5 h-5" />
                    <span>Estimated Arrival: 25-30 mins</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Progress Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] card-shadow border border-slate-50 relative overflow-hidden">
                        <div className="relative z-10 space-y-10">
                            {steps.map((step, index) => (
                                <div key={step} className="flex gap-6 relative">
                                    {/* Connector Line */}
                                    {index < steps.length - 1 && (
                                        <div className={`absolute left-4 top-10 w-0.5 h-10 ${index < currentStepIndex ? 'bg-navy' : 'bg-slate-100 border-l-2 border-dashed border-slate-200'
                                            }`} />
                                    )}

                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${index <= currentStepIndex ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'bg-slate-100 text-slate-300'
                                        }`}>
                                        {index < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className={`font-black text-lg ${index <= currentStepIndex ? 'text-navy' : 'text-slate-300'}`}>
                                            {step}
                                        </h3>
                                        <p className="text-sm font-bold text-slate-400">
                                            {index <= currentStepIndex ? "Updated today at 09:30 AM" : "Not yet reached"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-navy rounded-[3rem] p-10 text-white shadow-2xl shadow-navy/20 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Truck className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-xl">Ronald Richards</h4>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 opacity-60 text-sm font-bold">
                                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 11 New Market, New york, USA</p>
                                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> +1 234 567 890</p>
                            </div>
                        </div>
                        <button className="bg-white text-navy px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">
                            Live Tracking
                        </button>
                    </div>
                </div>

                {/* Order Info & Summary */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-6">
                        <h3 className="text-xl font-black text-navy border-b border-slate-50 pb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.orderItems.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                                        <div>
                                            <p className="font-bold text-navy text-sm">{item.title}</p>
                                            <p className="text-xs font-bold text-slate-400">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-navy">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate-50 space-y-4">
                            <div className="flex justify-between font-bold text-slate-400">
                                <span>Subtotal</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-slate-400 font-bold">Grand Total</span>
                                <span className="text-3xl font-black text-navy">${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-4">
                        <h3 className="text-xl font-black text-navy italic">Delivery Address</h3>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-navy shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <p className="text-slate-500 font-medium text-sm pt-2">
                                {order.shippingAddress.house}, {order.shippingAddress.street}, <br />
                                {order.shippingAddress.city} - {order.shippingAddress.pincode}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Star = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

export default OrderDetail;
