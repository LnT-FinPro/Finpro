import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import products from '@/routes/products';

// Definisikan tipe data untuk Product dan Pagination
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
}

interface PaginatedLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginatedLink[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Filters {
    search?: string;
    min_price?: string;
    max_price?: string;
}

interface Props {
    products: PaginatedProducts;
    filters: Filters;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Product Management',
        href: products.index().url,
    },
];

export default function AdminProductIndex({ products: paginatedProducts, filters }: Props) {
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
    });

    function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        get(products.index().url, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleDeleteProduct(productId: number) {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(products.destroy(productId).url, {
                preserveScroll: true,
            });
        }
    }

    const getImageUrl = (imagePath?: string) => {
        if (imagePath) {
            return `/storage/${imagePath}`;
        }
        return 'https://via.placeholder.com/150/CCCCCC/969696?Text=No+Image';
    };

    const getStockBadgeColor = (stock: number) => {
        if (stock === 0) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
        if (stock < 10) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    };

    const getStockText = (stock: number) => {
        if (stock === 0) return 'Out of Stock';
        if (stock < 10) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin: Product Management" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 md:p-6">
                {/* Header Section dengan Gradient */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Product Management</h1>
                            <p className="mt-2 text-blue-100">Manage your products with ease and style</p>
                            <div className="mt-4 flex items-center gap-6 text-sm text-blue-100">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                    <span>{paginatedProducts.total} Total Products</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                    <span>Page {paginatedProducts.current_page} of {paginatedProducts.last_page}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* View Mode Toggle */}
                            <div className="flex rounded-lg bg-white/20 p-1">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                        viewMode === 'table' 
                                            ? 'bg-white text-gray-900 shadow-sm' 
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                                        viewMode === 'grid' 
                                            ? 'bg-white text-gray-900 shadow-sm' 
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                            </div>
                            <Link
                                href={products.create().url}
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Product
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filter Section dengan Animation */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                        <button
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                            className="flex w-full items-center justify-between text-left"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                            </div>
                            <svg 
                                className={`h-5 w-5 text-gray-500 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${isFilterExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4">
                            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div className="space-y-2">
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Search Products
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                            placeholder="Search by name or description..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Min Price (IDR)
                                    </label>
                                    <input
                                        type="number"
                                        name="min_price"
                                        id="min_price"
                                        value={data.min_price}
                                        onChange={(e) => setData('min_price', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                        placeholder="10,000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Max Price (IDR)
                                    </label>
                                    <input
                                        type="number"
                                        name="max_price"
                                        id="max_price"
                                        value={data.max_price}
                                        onChange={(e) => setData('max_price', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                        placeholder="500,000"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:opacity-50 md:w-auto"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Filtering...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                                </svg>
                                                Apply Filters
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {viewMode === 'table' ? (
                    // Table View
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Product</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Price</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Stock Status</th>
                                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-800 dark:divide-gray-700">
                                    {paginatedProducts.data.length > 0 ? (
                                        paginatedProducts.data.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 flex-shrink-0">
                                                            <img 
                                                                src={getImageUrl(product.image)} 
                                                                alt={product.name} 
                                                                className="h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-gray-200 dark:ring-gray-700" 
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{product.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStockBadgeColor(product.stock)}`}>
                                                            {getStockText(product.stock)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">({product.stock})</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link 
                                                            href={products.show(product.id).url}
                                                            className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link 
                                                            href={products.edit(product.id).url}
                                                            className="inline-flex items-center rounded-lg bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30 transition-colors"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            className="inline-flex items-center rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">No products found</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    // Grid View
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedProducts.data.length > 0 ? (
                            paginatedProducts.data.map((product) => (
                                <div key={product.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="aspect-square overflow-hidden">
                                        <img 
                                            src={getImageUrl(product.image)} 
                                            alt={product.name} 
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                                            <span className={`ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStockBadgeColor(product.stock)}`}>
                                                {product.stock}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{product.description}</p>
                                        <div className="mb-4">
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link 
                                                href={products.show(product.id).url}
                                                className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-center text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                                            >
                                                View
                                            </Link>
                                            <Link 
                                                href={products.edit(product.id).url}
                                                className="flex-1 rounded-lg bg-yellow-50 px-3 py-2 text-center text-xs font-medium text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="rounded-lg bg-red-50 p-2 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12">
                                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination Section */}
                {paginatedProducts.data.length > 0 && (
                    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold">{paginatedProducts.from}</span> to <span className="font-semibold">{paginatedProducts.to}</span> of <span className="font-semibold">{paginatedProducts.total}</span> results
                        </p>
                        <div className="flex items-center gap-1">
                            {paginatedProducts.links.map((link, index) => (
                                <React.Fragment key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`relative inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all
                                                ${link.active 
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                                                    : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}