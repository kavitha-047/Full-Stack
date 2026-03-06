import React, { useState, useEffect } from 'react';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Fruits', 'Vegetables', 'Staples', 'Dairy', 'Snacks', 'Bakery', 'Beverages', 'Spices'];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await API.get(`/products?category=${category}&search=${search}`);
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, search]);

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Search & Header Section */}
            <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                <div className="space-y-1">
                    <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">
                        Daily <br /> Grocery Food
                    </h1>
                </div>

                <div className="relative w-full md:w-[400px]">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 p-1.5 bg-navy rounded-lg text-white">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Fresh lemon..."
                        className="w-full pl-14 pr-12 py-5 rounded-[1.5rem] border-none bg-white card-shadow focus:ring-4 focus:ring-navy/5 transition-all text-navy font-semibold placeholder:text-slate-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-navy transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Category Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-navy">Popular Food</h2>
                    <button className="text-navy/40 font-bold hover:text-navy transition-colors text-sm">See All</button>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn-pill ${category === cat
                                ? 'btn-pill-active shadow-lg shadow-navy/20'
                                : 'btn-pill-inactive shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 font-bold text-lg">No products found matching your search.</p>
                </div>
            )}

            {/* Similar Promotion Section from UI */}
            {!search && category === 'All' && (
                <section className="bg-navy rounded-[3rem] p-12 relative overflow-hidden">
                    <div className="relative z-10 space-y-4 max-w-sm">
                        <h3 className="text-3xl font-black text-white">Save on your <br /> first order!</h3>
                        <p className="text-white/60 font-medium">Get fresh ingredients delivered home in minutes.</p>
                        <button className="bg-accent text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
                            Claim Now
                        </button>
                    </div>
                    <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
                </section>
            )}
        </div>
    );
};

export default Home;
