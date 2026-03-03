import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-[2rem] p-4 card-shadow border border-slate-50 flex flex-col h-full animate-pulse">
            <div className="mb-4 rounded-[1.5rem] aspect-square bg-slate-100" />
            <div className="flex flex-col flex-grow space-y-3">
                <div className="h-3 w-1/3 bg-slate-100 rounded-full" />
                <div className="h-6 w-2/3 bg-slate-100 rounded-full" />
                <div className="mt-auto flex items-center justify-between">
                    <div className="h-8 w-1/2 bg-slate-100 rounded-full" />
                    <div className="w-10 h-10 bg-slate-100 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
