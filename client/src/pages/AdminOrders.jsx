import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Box, Eye, MoreVertical } from 'lucide-react';
import API from '../api/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders');
            setOrders(data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success(`Order set to ${status}`);
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 mt-8">
            <div>
                <h1 className="text-4xl font-black text-navy tracking-tight">Order Management</h1>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Review and fulfill customer orders</p>
            </div>

            <div className="bg-white rounded-[3rem] card-shadow border border-slate-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Total</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-navy uppercase">#{order._id.slice(-6)}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-navy">{order.user?.name}</span>
                                            <span className="text-xs text-slate-400 font-bold">{order.user?.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 font-black text-navy">${order.totalPrice.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            className={`px-4 py-2 rounded-xl text-xs font-black border-none focus:ring-2 focus:ring-navy/5 appearance-none cursor-pointer ${order.status === 'Delivered' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-navy'
                                                }`}
                                        >
                                            {['Placed', 'Confirmed', 'Processing', 'Delivered'].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Link to={`/orders/${order._id}`} className="p-3 bg-slate-50 text-navy hover:bg-navy hover:text-white rounded-xl transition-all inline-block">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
