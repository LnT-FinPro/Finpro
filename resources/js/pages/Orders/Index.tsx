// src/Pages/Orders/Index.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type OrdersPageProps, type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import routeOrders from '@/routes/orders';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceDocument } from '@/components/InvoiceDocument';

// Enhanced Order Card Component
const OrderCard = ({ order, index }: { order: any; index: number }) => {
    // In a real app, ensure `order` prop includes user details from the backend.
    // This is a fallback for demonstration purposes.
    if (!order.user) {
        order.user = { name: 'Customer Name', email: 'customer@example.com' };
    }

    const orderDate = format(new Date(order.created_at), 'd MMMM yyyy, HH:mm', { locale: localeID });
    const totalItems = order.order_details?.reduce((sum: number, detail: any) => sum + detail.quantity, 0) || 0;

    return (
        <div 
            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    <Link 
                                        href={routeOrders.show(order.id).url} 
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group-hover:underline"
                                    >
                                        Pesanan #{order.id}
                                    </Link>
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {orderDate}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                                </svg>
                                {totalItems} Item
                            </div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Selesai
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Pembayaran</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            Rp{order.total_price.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Detail Barang
                    </h3>
                    
                    <div className="space-y-3">
                        {order.order_details?.map((detail: any, detailIndex: number) => (
                            <div 
                                key={detail.id} 
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                style={{ animationDelay: `${(index * 100) + (detailIndex * 50)}ms` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                                        {`storage/${detail.product.image}` ? (
                                            <img 
                                                src={`storage/${detail.product.image}`} 
                                                alt={detail.product.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {detail.product.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Rp{detail.product.price?.toLocaleString('id-ID')} × {detail.quantity}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-1">
                                        {detail.quantity}x
                                    </div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        Rp{((detail.product.price || 0) * detail.quantity).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href={routeOrders.show(order.id).url}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Lihat Detail
                    </Link>
                    
                    <PDFDownloadLink
                        document={<InvoiceDocument order={order} />}
                        fileName={`invoice-${order.id}.pdf`}
                    >
                        {({ loading }) => (
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl transition-colors duration-200 disabled:opacity-50"
                                disabled={loading}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {loading ? 'Membuat...' : 'Download Invoice'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    );
};

export default function OrdersIndexPage() {
    const { orders } = usePage<OrdersPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Pesanan Saya', href: routeOrders.index().url, current: true }];

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum: number, order: any) => sum + order.total_price, 0);
    const totalItems = orders.reduce((sum: number, order: any) => 
        sum + (order.order_details?.reduce((detailSum: number, detail: any) => detailSum + detail.quantity, 0) || 0), 0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pesanan Saya" />
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Pesanan Saya
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola dan pantau semua pesanan Anda
                    </p>
                </div>

                {orders.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm mb-1">Total Pesanan</p>
                                        <p className="text-3xl font-bold">{totalOrders}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm mb-1">Total Belanja</p>
                                        <p className="text-2xl font-bold">Rp{totalSpent.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm mb-1">Total Item</p>
                                        <p className="text-3xl font-bold">{totalItems}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Riwayat Pesanan
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                    </svg>
                                    Diurutkan dari yang terbaru
                                </div>
                            </div>
                            
                            {orders.map((order: any, index: number) => (
                                <OrderCard key={order.id} order={order} index={index} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Belum Ada Pesanan
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Anda belum melakukan pemesanan apapun. Mulai berbelanja sekarang!
                            </p>
                            <Link 
                                href="/products" 
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Mulai Belanja
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}