import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product as ProductType, type Review as ReviewType, type User as UserType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';
import productsRoute from '@/routes/products';
import cartRoute from '@/routes/cart';
import reviewsRoute from '@/routes/reviews';

interface AuthProps {
    user: UserType | null;
}

interface Props {
    product: ProductType;
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
        },
    ];

    const { post: addToCart, processing: cartProcessing, errors: cartErrors } = useForm({
        product_id: product.id,
        quantity: selectedQuantity,
    });

    const handleAddToCart: FormEventHandler = (e) => {
        e.preventDefault();
        addToCart(cartRoute.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                // You can add a toast notification here
            },
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
        rating: 5,
    });

    const handleReviewSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        submitReview(reviewsRoute.store(product.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                resetReviewForm('comment', 'rating');
            },
        });
    };

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
                                    {/* Product Title */}
                                    <div>
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                            {product.name}
                                        </h1>
                                        
                                        {/* Stock Status */}
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

                                    {/* Price */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                                        <p className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="prose prose-gray dark:prose-invert">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Quantity Selector & Add to Cart */}
                                    {auth.user && product.stock > 0 && (
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
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
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
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <form onSubmit={handleAddToCart} className="space-y-3">
                                                <button
                                                    type="submit"
                                                    disabled={cartProcessing || product.stock === 0}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                                >
                                                    {cartProcessing ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                            Menambahkan...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8L4 4H1m5 9v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                                                            </svg>
                                                            Tambah ke Keranjang
                                                        </>
                                                    )}
                                                </button>
                                                {(cartErrors.product_id || cartErrors.quantity) && (
                                                    <div className="text-red-500 text-sm space-y-1">
                                                        {cartErrors.product_id && <p>{cartErrors.product_id}</p>}
                                                        {cartErrors.quantity && <p>{cartErrors.quantity}</p>}
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    )}

                                    {!auth.user && product.stock > 0 && (
                                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                            <p className="text-amber-800 dark:text-amber-200 text-center">
                                                <Link 
                                                    href="/login" 
                                                    className="font-semibold underline hover:no-underline transition-all"
                                                >
                                                    Masuk
                                                </Link> 
                                                {' '}untuk membeli produk ini
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
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049.895a1 1 0 011.902 0l1.562 4.796a1 1 0 00.95.69h5.032a1 1 0 01.707 1.707l-3.887 2.83a1 1 0 00-.364 1.118l1.562 4.796a1 1 0 01-1.54 1.118L10 13.347l-3.887 2.83a1 1 0 01-1.54-1.118l1.562-4.796a1 1 0 00-.364-1.118L2.064 8.09A1 1 0 012.77 6.382h5.032a1 1 0 00.95-.69L9.049.895z" />
                                    </svg>
                                    Ulasan Pelanggan
                                </h2>
                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                                    {product.reviews.length} ulasan
                                </span>
                            </div>

                            {/* Add Review Form */}
                            {auth.user && (
                                <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        Tulis Ulasan
                                    </h3>
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Rating
                                            </label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewData('rating', star)}
                                                        className={`p-1 transition-colors ${
                                                            star <= reviewData.rating 
                                                                ? 'text-amber-400 hover:text-amber-500' 
                                                                : 'text-gray-300 hover:text-amber-300 dark:text-gray-600 dark:hover:text-amber-400'
                                                        }`}
                                                    >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049.895a1 1 0 011.902 0l1.562 4.796a1 1 0 00.95.69h5.032a1 1 0 01.707 1.707l-3.887 2.83a1 1 0 00-.364 1.118l1.562 4.796a1 1 0 01-1.54 1.118L10 13.347l-3.887 2.83a1 1 0 01-1.54-1.118l1.562-4.796a1 1 0 00-.364-1.118L2.064 8.09A1 1 0 012.77 6.382h5.032a1 1 0 00.95-.69L9.049.895z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Ulasan Anda
                                            </label>
                                            <textarea
                                                id="comment"
                                                rows={4}
                                                value={reviewData.comment}
                                                onChange={(e) => setReviewData('comment', e.target.value)}
                                                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                                placeholder="Bagikan pengalaman Anda dengan produk ini..."
                                                required
                                            />
                                            {reviewErrors.comment && (
                                                <p className="mt-2 text-sm text-red-500">{reviewErrors.comment}</p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={reviewProcessing}
                                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                                        >
                                            {reviewProcessing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                    Kirim Ulasan
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-6">
                                {product.reviews.length > 0 ? (
                                    product.reviews.map((review, index) => (
                                        <div 
                                            key={review.id} 
                                            className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                        {review.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {review.user.name}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center">
                                                                {renderStars(review.rating)}
                                                            </div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {new Date(review.created_at).toLocaleDateString('id-ID', { 
                                                                    year: 'numeric', 
                                                                    month: 'long', 
                                                                    day: 'numeric' 
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pl-13">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-1.71.985L12 17l-3.29 1.985A2 2 0 017 18V8" />
                                        </svg>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                                            Belum ada ulasan untuk produk ini
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                                            Jadilah yang pertama memberikan ulasan!
                                        </p>
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