// src/Pages/Products/Show.tsx (Versi Perbaikan)

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product as ProductType, type Review as ReviewType, type User as UserType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import productsRoute from '@/routes/products';
import cartRoute from '@/routes/cart';
import reviewsRoute from '@/routes/reviews';

interface AuthProps {
    user: UserType | null;
}

interface Props {
    product: ProductType & {
        reviews: Array<ReviewType & { user: UserType }> 
    };
    auth: AuthProps;
}

const getImageUrl = (imagePath?: string) => {
    if (imagePath) {
        return `/storage/${imagePath}`;
    }
    return 'https://via.placeholder.com/600x400/f8fafc/64748b?text=Product+Image';
};

export default function ProductShow({ product, auth }: Props) {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);
    

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: productsRoute.index().url,
        },
        {
            title: product.name,
            href: productsRoute.show(product.id).url,
            current: true, 
        },
    ];

    const { post: addToCart, processing: cartProcessing, errors: cartErrors } = useForm({
        product_id: product.id,
        quantity: selectedQuantity,
    });

    const handleAddToCart: FormEventHandler = (e) => {
        e.preventDefault();
        addToCart(cartRoute.store().url, {
             data: { product_id: product.id, quantity: selectedQuantity },
             preserveScroll: true,
        });
    };

    const { 
        data: reviewData, 
        setData: setReviewData, 
        post: submitReview, 
        processing: reviewProcessing, 
        errors: reviewErrors, 
        reset: resetReviewForm 
    } = useForm({
        comment: '',
        rating: 0, 
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        comment: '',
    });

    const handleReviewSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(reviewsRoute.store(product.id).url, {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    const currentUser = auth.user;
    const hasReviewed = currentUser ? product.reviews?.some(r => r.user_id === currentUser.id) : false;
    const canReview = currentUser && !hasReviewed;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const renderStars = (rating: number = 0) => {
        return [...Array(5)].map((_, i) => (
            <svg 
                key={i} 
                className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
            >
                <path d="M9.049.895a1 1 0 011.902 0l1.562 4.796a1 1 0 00.95.69h5.032a1 1 0 01.707 1.707l-3.887 2.83a1 1 0 00-.364 1.118l1.562 4.796a1 1 0 01-1.54 1.118L10 13.347l-3.887 2.83a1 1 0 01-1.54-1.118l1.562-4.796a1 1 0 00-.364-1.118L2.064 8.09A1 1 0 012.77 6.382h5.032a1 1 0 00.95-.69L9.049.895z" />
            </svg>
        ));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    {/* Product Details Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Product Image */}
                            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                                     {!imageLoaded && (
                                         <div className="absolute inset-0 flex items-center justify-center">
                                             <div className="animate-pulse">
                                                 <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                             </div>
                                         </div>
                                     )}
                                     <img
                                         src={getImageUrl(product.image)}
                                         alt={product.name}
                                         className={`w-full h-full object-cover transition-all duration-700 ${
                                             imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                         }`}
                                         onLoad={() => setImageLoaded(true)}
                                     />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                 </div>
                            </div>

                            {/* Product Info & Actions */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                            {product.name}
                                        </h1>
                                        
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                product.stock > 0 
                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                                    product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
                                                }`}></div>
                                                {product.stock > 0 ? `${product.stock} tersedia` : 'Stok habis'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                                        <p className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                    <div className="prose prose-gray dark:prose-invert">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>
                                    {currentUser && product.stock > 0 && (
                                        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                     Jumlah:
                                                 </label>
                                                 <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                     <button
                                                         type="button"
                                                         onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                                         className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                     >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                                     </button>
                                                     <input
                                                         type="number"
                                                         value={selectedQuantity}
                                                         onChange={(e) => setSelectedQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                                         className="w-16 text-center border-none bg-transparent focus:ring-0 focus:outline-none dark:text-white"
                                                         min="1"
                                                         max={product.stock}
                                                     />
                                                     <button
                                                         type="button"
                                                         onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
                                                         className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                     >
                                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
                                                     </button>
                                                 </div>
                                            </div>
                                            <form onSubmit={handleAddToCart} className="space-y-3">
                                                <button
                                                    type="submit"
                                                    disabled={cartProcessing || product.stock === 0}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                                >
                                                     {cartProcessing ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                    {!currentUser && product.stock > 0 && (
                                         <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                             <p className="text-amber-800 dark:text-amber-200 text-center">
                                                 <Link href="/login" className="font-semibold underline hover:no-underline transition-all">Masuk</Link> untuk membeli produk ini
                                             </p>
                                         </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 lg:p-12">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Ulasan Pelanggan</h2>
                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                                    {product.reviews.length} ulasan
                                </span>
                            </div>

                            {canReview && (
                                <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tulis Ulasan Anda</h3>
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button" onClick={() => setReviewData('rating', star)} className={`p-1 transition-transform hover:scale-110 ${star <= reviewData.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}>
                                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049.895a1 1 0 011.902 0l1.562 4.796a1 1 0 00.95.69h5.032a1 1 0 01.707 1.707l-3.887 2.83a1 1 0 00-.364 1.118l1.562 4.796a1 1 0 01-1.54 1.118L10 13.347l-3.887 2.83a1 1 0 01-1.54-1.118l1.562-4.796a1 1 0 00-.364-1.118L2.064 8.09A1 1 0 012.77 6.382h5.032a1 1 0 00.95-.69L9.049.895z" /></svg>
                                                    </button>
                                                ))}
                                            </div>
                                            {reviewErrors.rating && <p className="mt-2 text-sm text-red-500">{reviewErrors.rating}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ulasan</label>
                                            <textarea id="comment" rows={4} value={reviewData.comment} onChange={(e) => setReviewData('comment', e.target.value)} className="w-full rounded-xl border-gray-300 dark:border-gray-600 focus:ring-blue-500" placeholder="Bagikan pengalaman Anda..."></textarea>
                                            {reviewErrors.comment && <p className="mt-2 text-sm text-red-500">{reviewErrors.comment}</p>}
                                        </div>
                                        <button type="submit" disabled={reviewProcessing || reviewData.rating === 0} className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                            {reviewProcessing ? 'Mengirim...' : 'Kirim Ulasan'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {hasReviewed && (
                                <div className="mb-10 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                                    <p className="font-semibold text-green-800 dark:text-green-200">Terima kasih, Anda sudah memberikan ulasan untuk produk ini.</p>
                                </div>
                            )}
                            
                            {!currentUser && (
                                <div className="mb-10 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <Link href="/login" className="text-blue-600 hover:underline font-semibold">Masuk</Link> untuk menulis ulasan.
                                    </p>
                                </div>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {product.reviews.length > 0 ? (
                                    product.reviews.map((review) => (
                                        <div key={review.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                        {review.user?.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{review.user?.name || 'Anonymous'}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex">{renderStars(review.rating)}</div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {new Date(review.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pl-14">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 dark:text-gray-400 text-lg">Belum ada ulasan untuk produk ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}