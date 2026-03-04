import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, Loader2, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await API.put('/auth/me', {
                name,
                email,
                password
            });

            setUser(data);
            toast.success('Profile updated successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white rounded-2xl shadow-sm text-navy hover:text-accent transition-all hover:scale-110"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-4xl font-black text-navy tracking-tight">Account Settings</h1>
                    <p className="text-slate-400 font-bold">Manage your profile and preferences</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[3rem] p-8 card-shadow border border-slate-50 text-center space-y-6 relative overflow-hidden">
                        <div className="relative inline-block group">
                            <div className="w-32 h-32 bg-navy rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-navy/20">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <button className="absolute bottom-1 right-1 p-3 bg-accent text-white rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-navy">{user?.name}</h2>
                            <p className="text-accent font-black text-sm uppercase tracking-widest mt-1 capitalize">{user?.role}</p>
                        </div>

                        <div className="pt-6 border-t border-slate-50 space-y-3">
                            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm bg-slate-50 p-4 rounded-2xl">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm bg-slate-50 p-4 rounded-2xl">
                                <User className="w-4 h-4" />
                                <span>Member since {new Date().getFullYear()}</span>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 card-shadow border border-slate-50 space-y-8">
                        <h3 className="text-2xl font-black text-navy flex items-center gap-3 italic">
                            <span className="w-8 h-8 bg-navy text-white text-sm not-italic flex items-center justify-center rounded-xl font-bold">1</span>
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-[1px] bg-slate-50" />

                        <h3 className="text-2xl font-black text-navy flex items-center gap-3 italic">
                            <span className="w-8 h-8 bg-navy text-white text-sm not-italic flex items-center justify-center rounded-xl font-bold">2</span>
                            Security
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-accent/20 active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Save Changes <Save className="w-6 h-6" /></>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
