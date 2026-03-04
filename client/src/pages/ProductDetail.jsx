import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Plus, Minus, Send, User } from 'lucide-react';
import API from '../api/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const [productRes, similarRes] = await Promise.all([
                    API.get(`/products/${id}`),
                    API.get(`/products/${id}/similar`)
                ]);
                setProduct(productRes.data);
                setSimilarProducts(similarRes.data);
            } catch (error) {
                toast.error('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${product.title} added to cart!`);
    };

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        try {
            await API.post(`/products/${id}/reviews`, { rating, comment });
            toast.success('Review submitted successfully!');
            setComment('');
            // Refresh product to show new review
            const { data } = await API.get(`/products/${id}`);
            setProduct(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-navy border-t-accent rounded-full animate-spin" />
            <p className="text-navy font-black animate-pulse">Loading Freshness...</p>
        </div>
    );

    if (!product) return <div className="text-center py-20 font-black text-navy text-2xl">Product not found. <Link to="/" className="text-accent underline">Go Home</Link></div>;

    return (
        <div className="max-w-6xl mx-auto space-y-16 pb-20">
            <Link to="/" className="inline-flex items-center gap-2 p-3 bg-white rounded-2xl text-navy font-bold shadow-sm hover:shadow-md transition-all hover:-translate-x-1">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Image Section */}
                <div className="bg-white rounded-[4rem] p-12 card-shadow border border-slate-50 relative overflow-hidden group">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-square object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-10 left-10">
                        <span className="bg-navy text-white text-xs font-black px-5 py-2.5 rounded-full shadow-xl tracking-wider uppercase">
                            Premium Choice
                        </span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-accent font-black text-sm uppercase tracking-tighter">
                            <span>{product.category}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>In Stock</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-navy leading-tight tracking-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                <span className="text-accent font-black">{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
                            </div>
                            <span className="text-slate-400 font-bold text-sm">({product.numReviews} Reviews)</span>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-8 bg-white rounded-[3rem] border border-slate-100 card-shadow">
                        <div className="flex flex-col">
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Select Quantity</span>
                            <div className="flex items-center gap-6 mt-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-navy hover:bg-navy hover:text-white transition-all"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="font-black text-navy text-2xl w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-navy hover:bg-navy hover:text-white transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="h-12 w-[1px] bg-slate-100" />
                        <div className="text-right">
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total</span>
                            <p className="text-3xl font-black text-navy mt-1">₹{(product.price * quantity).toFixed(2)}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-navy hover:bg-navy/90 text-white py-7 rounded-[2.5rem] font-black text-xl transition-all shadow-2xl shadow-navy/20 active:scale-95 flex items-center justify-center gap-4"
                    >
                        Add to cart
                        <ShoppingCart className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-navy">Similar Products</h2>
                        <span className="text-accent font-black text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full">Explore More</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {similarProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 border-t border-slate-100 pt-16">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-3xl font-black text-navy">Customer Reviews</h2>

                    {user ? (
                        <form onSubmit={submitReviewHandler} className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-6">
                            <h3 className="text-xl font-black text-navy italic">Write a Review</h3>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest">How was it? (Rating)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setRating(num)}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${rating >= num ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-slate-50 text-slate-300'
                                                }`}
                                        >
                                            <Star className={`w-5 h-5 ${rating >= num ? 'fill-white' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-navy uppercase tracking-widest">Your Experience</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-6 py-4 rounded-3xl bg-slate-50 border-none focus:ring-4 focus:ring-navy/5 transition-all font-semibold text-navy placeholder:text-slate-300 resize-none"
                                    placeholder="Tell others about this product..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="w-full bg-accent hover:bg-accent/90 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {submittingReview ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <>Post Review <Send className="w-5 h-5" /></>}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-4">
                            <p className="font-bold text-navy">Please sign in to write a review</p>
                            <Link to="/login" className="inline-block bg-navy text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">Login Now</Link>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3 space-y-8">
                    {product.reviews.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/50 rounded-[3rem] border border-slate-100">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                                <Star className="text-slate-200 w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-black text-navy">No reviews yet</h4>
                            <p className="text-slate-400 font-medium">Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review._id} className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 flex gap-6">
                                    <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-white shrink-0">
                                        <User className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-3 flex-grow">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-black text-navy text-lg">{review.name}</h4>
                                            <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent text-accent' : 'text-slate-100'}`} />
                                            ))}
                                        </div>
                                        <p className="text-slate-500 font-medium italic leading-relaxed">"{review.comment}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
