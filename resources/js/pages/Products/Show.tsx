// src/Pages/Products/Show.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { type ProductDetailPageProps, type BreadcrumbItem, Review as ReviewType, User } from '@/types';
import { useState, FormEvent } from 'react';
import { 
    Star, 
    ShoppingCart, 
    CreditCard, 
    Package, 
    MessageCircle, 
    Heart, 
    Share2, 
    Shield, 
    Truck, 
    RotateCcw,
    Plus,
    Minus,
    AlertCircle,
    CheckCircle,
    Trash2,
    Send,
    User as UserIcon,
    Award,
    Zap,
    TrendingUp
} from 'lucide-react';

// Impor objek rute Anda
import reviews from '@/routes/reviews';
import { login } from '@/routes';
import cart from '@/routes/cart';
import orders from '@/routes/orders';
import products from '@/routes/products';

const ReviewForm = ({ productId }: { productId: number }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        comment: '',
    });

    const submitReview = (e: FormEvent) => {
        e.preventDefault();
        post(reviews.store(productId).url, {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
            
            <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write Your Review</h3>
                </div>

                <form onSubmit={submitReview} className="space-y-6">
                    {/* Rating Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Rate this product
                        </label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setData('rating', star)}
                                    className={`text-3xl transition-all duration-200 transform hover:scale-110 ${
                                        data.rating >= star 
                                            ? 'text-yellow-400 hover:text-yellow-500' 
                                            : 'text-gray-300 hover:text-yellow-300'
                                    }`}
                                >
                                    <Star className={`w-8 h-8 ${data.rating >= star ? 'fill-current' : ''}`} />
                                </button>
                            ))}
                            {data.rating > 0 && (
                                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    ({data.rating} star{data.rating > 1 ? 's' : ''})
                                </span>
                            )}
                        </div>
                        {errors.rating && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.rating}
                            </p>
                        )}
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-3">
                        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Share your thoughts (Optional)
                        </label>
                        <textarea
                            id="comment"
                            value={data.comment}
                            onChange={e => setData('comment', e.target.value)}
                            rows={4}
                            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
                            placeholder="Tell others what you think about this product..."
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.comment}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={processing || data.rating === 0}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {processing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Submit Review
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const ReviewDisplay = ({ review }: { review: ReviewType }) => {
    const { auth } = usePage<ProductDetailPageProps>().props;
    const currentUser = auth.user as User | null;
    const { delete: destroyReview, processing } = useForm({});

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this review?')) {
            destroyReview(reviews.destroy(review.id).url, { preserveScroll: true });
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {review.user?.name || 'Anonymous User'}
                        </p>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                        i < review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                    }`} 
                                />
                            ))}
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>
                </div>
                
                {currentUser?.id === review.user_id && (
                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
            
            {review.comment && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {review.comment}
                </p>
            )}
        </div>
    )
}

export default function ProductShowPage() {
    const { product, auth } = usePage<ProductDetailPageProps>().props;
    const currentUser = auth.user as User | null;
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const { post: postToCart, processing: cartProcessing, setData: setCartData } = useForm({
        product_id: product.id,
        quantity: 1,
    });
    const { post: placeOrder, processing: orderProcessing } = useForm({});

    const handleQuantityChange = (newQuantity: number) => {
        const validQuantity = Math.max(1, Math.min(product.stock, newQuantity || 1));
        setQuantity(validQuantity);
        setCartData('quantity', validQuantity);
    };

    const handleAddToCart = () => {
        if (!currentUser) {
            router.visit(login().url);
            return;
        }
        if (quantity > product.stock) {
            alert('Cannot add more than available stock.');
            return;
        }
        setCartData('product_id', product.id);
        setCartData('quantity', quantity);
        postToCart(cart.store().url, {
            preserveScroll: true,
            onSuccess: () => { alert('Product successfully added to cart!'); },
            onError: (errors) => { alert('Failed to add to cart: ' + Object.values(errors).join("\n"));}
        });
    };

    const handleDirectBuy = () => {
         if (!currentUser) {
            router.visit(login().url);
            return;
        }
        if (!currentUser.money || currentUser.money < product.price * quantity) {
            alert('Insufficient balance for direct purchase.');
            return;
        }
         if (quantity > product.stock) {
            alert('Insufficient stock for direct purchase.');
            return;
        }
        setCartData('product_id', product.id);
        setCartData('quantity', quantity);
        postToCart(cart.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                placeOrder(orders.store().url, {
                    onSuccess: (page: any) => {
                        alert(page.props.flash?.success || 'Order created successfully!');
                    },
                    onError: (errors: any) => {
                        const flashError = (usePage().props as any).flash?.error;
                        alert('Failed to create order: ' + (flashError || Object.values(errors).join("\n")));
                        router.visit(cart.index().url);
                    }
                });
            },
            onError: (errors: any) => {
                alert('Failed to add to cart for direct purchase: ' + Object.values(errors).join("\n"));
            }
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Products', href: products.index().url },
        { title: product.name, href: products.show(product.id).url, current: true },
    ];

    const hasReviewed = product.reviews?.some(r => r.user_id === currentUser?.id);
    const canReview = currentUser && !hasReviewed;
    const averageRating = product.reviews?.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
        : 0;

    const totalCost = product.price * quantity;
    const isAffordable = currentUser ? (currentUser.money || 0) >= totalCost : false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Product Main Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl relative group">
                            {product.image ? (
                                <img 
                                    src={`/storage/${product.image}`} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-24 h-24 text-gray-400" />
                                </div>
                            )}
                            
                            {/* Stock Badge */}
                            <div className="absolute top-4 left-4">
                                {product.stock > 0 ? (
                                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" />
                                        In Stock ({product.stock})
                                    </div>
                                ) : (
                                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                                <button className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
                            
                            {/* Rating */}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-5 h-5 ${
                                                    i < Math.round(averageRating) 
                                                        ? 'text-yellow-400 fill-current' 
                                                        : 'text-gray-300'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {averageRating.toFixed(1)} ({product.reviews.length} review{product.reviews.length > 1 ? 's' : ''})
                                    </span>
                                </div>
                            )}
                            
                            {/* Price */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            Rp{product.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {product.description || 'No description available.'}
                            </p>
                        </div>

                        {/* Purchase Section */}
                        {product.stock > 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
                                {/* Quantity Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Quantity
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= 1}
                                                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                                                min="1"
                                                max={product.stock}
                                                className="w-16 text-center py-3 border-0 bg-transparent focus:outline-none focus:ring-0 font-semibold"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                disabled={quantity >= product.stock}
                                                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {product.stock} available
                                        </span>
                                    </div>
                                </div>

                                {/* Total Cost */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Rp{totalCost.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    {currentUser && !isAffordable && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            Insufficient balance
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={cartProcessing || quantity <= 0 || !currentUser}
                                        className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    
                                    <button
                                        onClick={handleDirectBuy}
                                        disabled={cartProcessing || orderProcessing || quantity <= 0 || !currentUser || !isAffordable}
                                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {(cartProcessing || orderProcessing) ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="w-5 h-5" />
                                                Buy Now
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* User Status Messages */}
                                {!currentUser && (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                                        <p className="text-yellow-800 dark:text-yellow-200 text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Please login to make a purchase
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                                <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Out of Stock</h3>
                                <p className="text-red-600 dark:text-red-300">This product is currently unavailable.</p>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-xs text-green-800 dark:text-green-200 font-medium">Secure Payment</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">Fast Delivery</p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">Easy Returns</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                            <Award className="w-8 h-8 text-yellow-500" />
                            Customer Reviews
                        </h2>
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="flex items-center justify-center gap-2 text-lg">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-6 h-6 ${
                                                i < Math.round(averageRating) 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {averageRating.toFixed(1)} out of 5
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    ({product.reviews.length} review{product.reviews.length > 1 ? 's' : ''})
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Reviews Display */}
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="grid gap-6 max-w-4xl mx-auto">
                            {product.reviews.map(review => (
                                <ReviewDisplay key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No reviews yet</h3>
                            <p className="text-gray-500 dark:text-gray-500">Be the first to review this product</p>
                        </div>
                    )}

                    {/* Review Form */}
                    {canReview && (
                        <div className="max-w-4xl mx-auto">
                            <ReviewForm productId={product.id} />
                        </div>
                    )}

                    {/* Review Status Messages */}
                    <div className="max-w-4xl mx-auto">
                        {!currentUser && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                    Please login to write a review
                                </p>
                            </div>
                        )}
                        {currentUser && hasReviewed && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                                <p className="text-green-800 dark:text-green-200 text-sm flex items-center justify-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Thank you for your review!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}