// src/Pages/Cart/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import { type CartPageProps, type BreadcrumbItem, type CartItem, User } from '@/types';
import cart from '@/routes/cart';
import products from '@/routes/products';
import { login } from '@/routes';
import orders from '@/routes/orders';

// Enhanced Cart Item Row Component
const CartItemRow = ({ item }: { item: CartItem }) => {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        quantity: item.quantity,
    });

    const handleUpdateQuantity = () => {
        if (data.quantity === item.quantity) return;
        put(cart.update(item.id).url, {
            preserveScroll: true,
            onError: (formErrors) => {
                setData('quantity', item.quantity);
                alert(Object.values(formErrors).join("\n"));
            },
        });
    };

    const handleRemoveItem = () => {
        if (confirm(`Hapus ${item.product.name} dari keranjang?`)) {
            destroy(cart.destroy(item.id).url, { preserveScroll: true });
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        const validQuantity = Math.max(1, Math.min(item.product.stock, newQuantity));
        setData('quantity', validQuantity);
    };

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Product Image & Info */}
                <div className="flex items-start gap-4 flex-1">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        {item.product.image ? (
                            <img 
                                src={`/storage/${item.product.image}`} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        {processing && (
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <Link 
                            href={products.show(item.product.id).url} 
                            className="block font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-lg mb-2 group-hover:underline"
                        >
                            {item.product.name}
                        </Link>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                Rp{item.product.price.toLocaleString('id-ID')} / unit
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Stok: {item.product.stock}
                            </span>
                        </div>
                        {errors.quantity && (
                            <p className="text-red-500 text-sm mb-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.quantity}
                            </p>
                        )}
                        {data.quantity > item.product.stock && (
                            <p className="text-yellow-600 text-sm mb-2 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Stok maksimum: {item.product.stock}
                            </p>
                        )}
                    </div>
                </div>

                {/* Quantity & Price Controls */}
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleQuantityChange(data.quantity - 1)}
                            disabled={processing || data.quantity <= 1}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                        </button>
                        
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                            onBlur={handleUpdateQuantity}
                            min="1"
                            max={item.product.stock}
                            className="w-16 h-8 text-center border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                            disabled={processing}
                        />
                        
                        <button
                            onClick={() => handleQuantityChange(data.quantity + 1)}
                            disabled={processing || data.quantity >= item.product.stock}
                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            Rp{(item.product.price * data.quantity).toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {data.quantity} × Rp{item.product.price.toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={handleRemoveItem}
                        disabled={processing}
                        className="flex items-center gap-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm font-medium">Hapus</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function CartIndexPage() {
    const { cartItems, totalPrice, auth } = usePage<CartPageProps>().props;
    const currentUser = auth.user as User | null;
    const { post, processing } = useForm({});

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Keranjang Anda', href: cart.index().url}];

    const handleCheckout = () => {
        if (!currentUser) {
            router.visit(login().url);
            return;
        }
        if ((currentUser?.money ?? 0) < totalPrice) {
            alert('Saldo tidak mencukupi. Silakan isi saldo Anda.');
            return;
        }
        post(orders.store().url, {
             onSuccess: (page: any) => {
                alert(page.props.flash?.success || 'Pesanan berhasil dibuat!');
            },
            onError: (errors: any) => {
                 alert('Gagal membuat pesanan: ' + ((usePage().props as PageProps).flash?.error || Object.values(errors).join("\n")));
            }
        });
    };

    const canCheckout = currentUser && totalPrice > 0 && (currentUser?.money ?? 0) >= totalPrice;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Keranjang Belanja
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {cartItems.length > 0 ? `${cartItems.length} item dalam keranjang` : 'Keranjang Anda kosong'}
                    </p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                    Item Belanjaan Anda
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Tinjau dan ubah item sebelum checkout
                                </p>
                            </div>
                            
                            {cartItems.map(item => (
                                <CartItemRow key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6">
                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">Ringkasan Pesanan</h3>
                                        <p className="text-blue-100 text-sm">Siap untuk checkout?</p>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {/* Price Breakdown */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                                <span>Subtotal ({cartItems.length} item)</span>
                                                <span>Rp{totalPrice.toLocaleString('id-ID')}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                                <span>Ongkos Kirim</span>
                                                <span className="text-green-600 font-medium">GRATIS</span>
                                            </div>
                                            <hr className="border-gray-200 dark:border-gray-700" />
                                            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                                <span>Total</span>
                                                <span className="text-blue-600 dark:text-blue-400">
                                                    Rp{totalPrice.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* User Balance */}
                                        {currentUser && (
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Saldo Anda:</span>
                                                    <span className={`font-semibold ${
                                                        currentUser.money >= totalPrice 
                                                            ? 'text-green-600 dark:text-green-400' 
                                                            : 'text-red-600 dark:text-red-400'
                                                    }`}>
                                                        Rp{currentUser.money.toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                {totalPrice > currentUser.money && (
                                                    <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Saldo tidak mencukupi untuk checkout
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Checkout Button */}
                                        <button
                                            onClick={handleCheckout}
                                            disabled={processing || !canCheckout}
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                                                canCheckout
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            {processing ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Memproses...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                    Lanjutkan ke Pembayaran
                                                </div>
                                            )}
                                        </button>

                                        {!currentUser && (
                                            <p className="text-center text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                                <Link href={login().url} className="font-medium hover:underline">
                                                    Masuk untuk melanjutkan ke pembayaran
                                                </Link>
                                            </p>
                                        )}

                                        {/* Security Badge */}
                                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Pembayaran aman & terenkripsi
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Keranjang Belanja Kosong
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Sepertinya Anda belum menambahkan produk apapun ke keranjang
                            </p>
                            <Link 
                                href={products.index().url} 
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Lanjutkan Belanja
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}