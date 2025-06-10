import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product as ProductType, type PaginatedProducts, type Filters, type AuthProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import productsRoute from '@/routes/products';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LoaderCircle, Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react';

const getImageUrl = (imagePath?: string) => {
    if (imagePath) {
        return `/storage/${imagePath}`;
    }
    return 'https://via.placeholder.com/300x200/CCCCCC/969696?Text=No+Image';
};



interface Props {
    products: PaginatedProducts;
    filters: Filters;
    auth: AuthProps;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Our Products',
        href: productsRoute.index().url,
    },
];

export default function ProductIndex({ products: paginatedProducts, filters, auth }: Props) {
    console.log(paginatedProducts);
        const { data, setData, get, processing } = useForm({
            search: filters.search || '',
            min_price: filters.min_price ?? null,
            max_price: filters.max_price ?? null,
    });

        const handleFilterSubmit: FormEventHandler = (e) => {
    e.preventDefault();

        const filteredData = {
            ...data,
            min_price: data.min_price ? data.min_price : undefined,
            max_price: data.max_price ? data.max_price : undefined,
        };

        get(productsRoute.index().url, {
            preserveState: true,
            preserveScroll: true,
            data: filteredData,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Our Products" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative container mx-auto px-4 text-center">
                        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            ✨ Discover Amazing Toys ✨
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-white/90 font-medium">
                            Unleash imagination with our carefully curated collection of premium toys
                        </p>
                        <div className="mt-8 flex justify-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce"></div>
                            <div className="h-2 w-2 rounded-full bg-white/80 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Enhanced Filter Section */}
                    <div className="mb-12 overflow-hidden rounded-2xl border border-white/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-white" />
                                <h2 className="text-lg font-semibold text-white">Smart Filters</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor="search_user" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <Search className="h-4 w-4" />
                                        <span>Search Products</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="search_user"
                                        value={data.search}
                                        onChange={(e) => setData('search', e.target.value)}
                                        className="border-2 border-gray-200 focus:border-indigo-500 rounded-xl transition-all duration-300 hover:border-gray-300"
                                        placeholder="Find your perfect toy..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="min_price_user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        💰 Min Price (IDR)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="min_price_user"
                                        value={data.min_price}
                                        onChange={(e) => setData('min_price', e.target.value)}
                                        className="border-2 border-gray-200 focus:border-green-500 rounded-xl transition-all duration-300"
                                        placeholder="e.g., 50,000"
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="max_price_user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        💎 Max Price (IDR)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="max_price_user"
                                        value={data.max_price}
                                        onChange={(e) => setData('max_price', e.target.value)}
                                        className="border-2 border-gray-200 focus:border-green-500 rounded-xl transition-all duration-300"
                                        placeholder="e.g., 1,000,000"
                                        min="0"
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    ✨ Apply Filters
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {paginatedProducts.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginatedProducts.data.map((product: ProductType) => (
                                <div key={product.id} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                                    {/* Product Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                                            🎯 Popular
                                        </span>
                                    </div>
                                    
                                    {/* Wishlist Button */}
                                    <button className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110">
                                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                                    </button>

                                    <Link href={productsRoute.show(product.id).url} className="block">
                                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                                            <img
                                                src={getImageUrl(product.image)}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        
                                        <div className="p-6 space-y-3">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center space-x-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < Math.round(product.reviews_avg_rating || 0)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-xs text-gray-500">
                                                    ({product.reviews_count})
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-2">
                                                <div>
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                        {new Intl.NumberFormat('id-ID', { 
                                                            style: 'currency', 
                                                            currency: 'IDR', 
                                                            minimumFractionDigits: 0 
                                                        }).format(product.price)}
                                                    </p>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transform transition-all duration-300 hover:scale-105 rounded-xl"
                                                >
                                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                <Search className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Products Found</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                We couldn't find any toys matching your criteria. Try adjusting your search or filters to discover more amazing products!
                            </p>
                        </div>
                    )}

                    {/* Enhanced Pagination */}
                    {paginatedProducts.data.length > 0 && (
                        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{paginatedProducts.from}</span> to{' '}
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{paginatedProducts.to}</span> of{' '}
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{paginatedProducts.total}</span> amazing products
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {paginatedProducts.links.map((link, index) => (
                                    <React.Fragment key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`relative inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105
                                                    ${link.active 
                                                        ? 'z-10 border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="relative inline-flex items-center rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-600"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}