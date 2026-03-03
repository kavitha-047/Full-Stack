import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LayoutGrid, List, Search, Box } from 'lucide-react';
import API from '../api/api';
import toast from 'react-hot-toast';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: 'Fruits',
        stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditProduct(product);
            setFormData({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
                stock: product.stock
            });
        } else {
            setEditProduct(null);
            setFormData({ title: '', price: '', description: '', image: '', category: 'Fruits', stock: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
            if (editProduct) {
                await API.put(`/products/${editProduct._id}`, payload);
                toast.success('Product updated');
            } else {
                await API.post('/products', payload);
                toast.success('Product added');
            }
            fetchProducts();
            setShowModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 mt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-navy tracking-tight">Manage Inventory</h1>
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Admin Control Panel</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-navy/20 transition-all active:scale-95"
                >
                    <Plus className="w-6 h-6" /> Add New Item
                </button>
            </div>

            <div className="bg-white rounded-[3rem] card-shadow border border-slate-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Product</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Price</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Stock</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                                            <span className="font-bold text-navy">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{product.category}</span>
                                    </td>
                                    <td className="px-8 py-6 font-black text-navy">₹{product.price.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <span className={`font-bold ${product.stock < 10 ? 'text-accent' : 'text-primary'}`}>{product.stock} in stock</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => handleOpenModal(product)} className="p-3 bg-slate-50 text-navy hover:bg-navy hover:text-white rounded-xl transition-all"><Edit className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(product._id)} className="p-3 bg-slate-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/20 backdrop-blur-md">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <h2 className="text-3xl font-black text-navy">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price</label>
                                <input required type="number" step="0.01" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                                <input required type="number" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                                <input required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold appearance-none" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    {['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Bakery', 'Beverages'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea required rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 font-semibold resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="col-span-2 flex gap-4 pt-4">
                                <button type="submit" className="flex-grow bg-navy text-white py-4 rounded-2xl font-bold shadow-lg shadow-navy/20 hover:bg-navy-light transition-all">
                                    {editProduct ? 'Update Item' : 'Create Item'}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-8 bg-slate-100 text-navy py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
