// src/Pages/Orders/Show.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type OrderDetailPageProps, type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import orders from '@/routes/orders';
import products from '@/routes/products';

export default function OrderShowPage() {
    const { order } = usePage<OrderDetailPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pesanan Saya', href: orders.index().url },
        { title: `Pesanan #${order.id}`, href: orders.show(order.id).url, current: true },
    ];

    // Status badge component
    const StatusBadge = ({ status }: { status: string }) => {
        const getStatusColor = (status: string) => {
            switch (status?.toLowerCase()) {
                case 'selesai':
                case 'completed':
                    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
                case 'pending':
                    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
                case 'cancelled':
                    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
                default:
                    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            }
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status || 'Selesai')}`}>
                {status || 'Selesai'}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-600 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                        Pesanan #{order.id}
                                    </h1>
                                    <StatusBadge status={order.status || 'Selesai'} />
                                </div>
                                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1H5V9a2 2 0 012-2h1z" />
                                        </svg>
                                        Dipesan pada: {format(new Date(order.created_at), 'd MMMM yyyy, HH:mm', { locale: localeID })}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Pelanggan: {order.user.name} ({order.user.email})
                                    </p>
                                </div>
                            </div>
                            
                            <div className="text-center lg:text-right bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Pembayaran</p>
                                <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Rp{order.total_price.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Barang yang Dipesan
                            </h2>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
                                {order.order_details.length} item
                            </span>
                        </div>
                        
                        <div className="space-y-4">
                            {order.order_details.map((detail, index) => (
                                <div key={detail.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                                        {/* Product Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden shadow-sm">
                                                {detail.product.image ? (
                                                    <img 
                                                        src={`/storage/${detail.product.image}`} 
                                                        alt={detail.product.name} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                                                {detail.quantity}x
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-grow text-center sm:text-left">
                                            <Link 
                                                href={products.show(detail.product.id).url} 
                                                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group-hover:underline"
                                            >
                                                {detail.product.name}
                                            </Link>
                                            <div className="mt-2 flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    Rp{detail.price.toLocaleString('id-ID')} / item
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                    Jumlah: {detail.quantity}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-center sm:text-right">
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                Rp{(detail.quantity * detail.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600 dark:text-gray-400">
                                    <p className="text-sm">Total {order.order_details.length} item</p>
                                    <p className="text-sm">
                                        {order.order_details.reduce((sum, detail) => sum + detail.quantity, 0)} produk
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Total Pembayaran</p>
                                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                        Rp{order.total_price.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}