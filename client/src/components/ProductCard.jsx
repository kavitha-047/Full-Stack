import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="bg-white rounded-[2rem] p-4 card-shadow hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
            <Link to={`/product/${product._id}`} className="block mb-4 overflow-hidden rounded-[1.5rem] aspect-square bg-slate-50 relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-navy text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                        75 cal
                    </span>
                </div>
            </Link>

            <div className="flex flex-col flex-grow">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{product.category}</p>
                <Link to={`/product/${product._id}`}>
                    <h3 className="font-extrabold text-navy text-lg leading-tight mb-2 hover:text-accent transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold">$10.45/kg</span>
                        <span className="text-xl font-black text-accent">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-accent hover:bg-accent/90 text-white w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-accent/20 active:scale-90"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
