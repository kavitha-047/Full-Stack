import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-primary mb-4">FreshCart</h3>
                        <p className="text-gray-500 max-w-xs">
                            Your one-stop shop for fresh groceries delivered right to your doorstep. Quality products, competitive prices.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="/" className="hover:text-primary">Home</a></li>
                            <li><a href="/cart" className="hover:text-primary">Cart</a></li>
                            <li><a href="/orders" className="hover:text-primary">My Orders</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-primary">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} FreshCart E-Commerce. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
