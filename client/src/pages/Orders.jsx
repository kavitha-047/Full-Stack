import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle2, Truck, Box } from 'lucide-react';
import API from '../api/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/my');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Placed': return <Clock className="w-5 h-5 text-blue-500" />;
            case 'Confirmed': return <CheckCircle2 className="w-5 h-5 text-indigo-500" />;
            case 'Processing': return <Box className="w-5 h-5 text-orange-500" />;
            case 'Delivered': return <Truck className="w-5 h-5 text-primary" />;
            default: return <Package className="w-5 h-5 text-slate-400" />;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <h1 className="text-4xl font-black text-navy tracking-tight">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 italic text-slate-400 font-bold">
                    You haven't placed any orders yet.
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            to={`/orders/${order._id}`}
                            className="block bg-white p-6 rounded-[2rem] card-shadow border border-slate-50 hover:bg-slate-50/50 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-navy shrink-0">
                                        <Package className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Order #{order._id.slice(-6).toUpperCase()}</p>
                                        <h3 className="text-lg font-black text-navy">
                                            {order.orderItems.length} {order.orderItems.length === 1 ? 'Item' : 'Items'}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-400">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-8">
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                                        <p className="text-2xl font-black text-navy">₹{order.totalPrice.toFixed(2)}</p>
                                    </div>

                                    <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm ${order.status === 'Delivered' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-navy'
                                        }`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>

                                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-navy transition-colors hidden md:block" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
