import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-navy/5 border border-slate-50 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-navy mx-auto mb-6">
                        <User className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-navy mb-2 tracking-tight">Register Now</h2>
                    <p className="text-slate-400 font-medium">Sign up today and start your fresh journey with us.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy transition-colors w-5 h-5" />
                            <input
                                type="text"
                                required
                                className="w-full pl-14 pr-4 py-5 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-navy/5 transition-all text-navy font-semibold placeholder:text-slate-300"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy transition-colors w-5 h-5" />
                            <input
                                type="email"
                                required
                                className="w-full pl-14 pr-4 py-5 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-navy/5 transition-all text-navy font-semibold placeholder:text-slate-300"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy transition-colors w-5 h-5" />
                            <input
                                type="password"
                                required
                                className="w-full pl-14 pr-4 py-5 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-navy/5 transition-all text-navy font-semibold placeholder:text-slate-300"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-navy hover:bg-navy-light text-white py-5 rounded-[1.5rem] font-black transition-all shadow-xl shadow-navy/20 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign Up <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400 font-bold">
                        Already have an account? {' '}
                        <Link to="/login" className="text-navy hover:underline">Sign in.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
