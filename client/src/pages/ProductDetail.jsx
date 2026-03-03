import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import API from '../api/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                toast.error('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${product.title} added to cart!`);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found. <Link to="/" className="text-primary">Go Home</Link></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <Link to="/" className="inline-flex items-center gap-2 p-3 bg-white rounded-2xl text-navy font-bold shadow-sm hover:shadow-md transition-all">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Image Section */}
                <div className="bg-white rounded-[3rem] p-8 card-shadow border border-slate-50 relative overflow-hidden group">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-square object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-8 left-8">
                        <span className="bg-navy text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                            Fresh & Organic
                        </span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight tracking-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            <span className="text-slate-400 font-bold text-sm">4.0 (Victor Floxin)</span>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {product.description || "These are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour."}
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 card-shadow">
                        <div className="flex flex-col">
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Available in stock</span>
                            <span className="text-2xl font-black text-navy capitalize">{product.stock} items left</span>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-navy hover:text-accent transition-colors"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-black text-navy text-lg w-6 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-navy hover:text-accent transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-slate-400 font-bold text-xs">Total Price</span>
                            <span className="text-3xl font-black text-accent">₹{(product.price * quantity).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-grow bg-navy hover:bg-navy-light text-white py-6 rounded-[2rem] font-black transition-all shadow-2xl shadow-navy/20 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Add to cart
                            <ShoppingCart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products Placeholder */}
            <div className="space-y-8">
                <h2 className="text-2xl font-black text-navy">Similar Products</h2>
                <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="min-w-[200px] h-32 bg-slate-100 rounded-[2rem] animate-pulse shrink-0 border border-slate-50" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
