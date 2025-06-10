import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product as ProductType } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';
import products from '@/routes/products';

// Asumsi komponen UI ini sudah ada
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle, Package, Upload, ArrowLeft, ImageIcon, Edit3, RefreshCw } from 'lucide-react';

interface EditProductForm {
    name: string;
    description: string;
    price: string;
    stock: string;
    image: File | null;
    _method: 'PUT';
}

interface Props {
    product: ProductType;
}

const getImageUrl = (imagePath?: string) => {
    if (imagePath) {
        return `/storage/${imagePath}`;
    }
    return null;
};

export default function AdminProductEdit({ product }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm<EditProductForm>({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        image: null,
        _method: 'PUT',
    });

    const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
    const currentImageUrl = getImageUrl(product.image);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(products.update(product.id).url);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            setNewImagePreview(URL.createObjectURL(file));
        } else {
            setData('image', null);
            setNewImagePreview(null);
        }
    };
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Product Management',
            href: products.index().url,
        },
        {
            title: `Edit: ${product.name}`,
            href: products.edit(product.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin: Edit ${product.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="mx-auto max-w-4xl px-4 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                                <Edit3 className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Edit Product
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">
                                    Update details for: <span className="font-semibold text-slate-700 dark:text-slate-300">{product.name}</span>
                                </p>
                            </div>
                        </div>
                        
                        <Link
                            href={products.index().url}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Products
                        </Link>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Form Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        {/* Product Name */}
                                        <div className="group">
                                            <Label htmlFor="name" className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                                Product Name
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="h-12 text-base border-2 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-emerald-500/10"
                                                    placeholder="Enter product name..."
                                                    required
                                                />
                                            </div>
                                            <InputError message={errors.name} className="mt-2 text-red-500" />
                                        </div>

                                        {/* Price */}
                                        <div className="group">
                                            <Label htmlFor="price" className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                                Price (IDR)
                                            </Label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
                                                    Rp
                                                </span>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    className="h-12 text-base pl-12 border-2 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-emerald-500/10"
                                                    placeholder="0"
                                                    required
                                                    min="0"
                                                />
                                            </div>
                                            <InputError message={errors.price} className="mt-2 text-red-500" />
                                        </div>

                                        {/* Stock */}
                                        <div className="group">
                                            <Label htmlFor="stock" className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                                Stock Quantity
                                            </Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                className="h-12 text-base border-2 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-emerald-500/10"
                                                placeholder="Available quantity"
                                                required
                                                min="0"
                                            />
                                            <InputError message={errors.stock} className="mt-2 text-red-500" />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Description */}
                                        <div className="group">
                                            <Label htmlFor="description" className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                                Product Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="min-h-[140px] text-base border-2 border-slate-200 dark:border-slate-600 focus:border-emerald-500 dark:focus:border-emerald-400 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-emerald-500/10 resize-none"
                                                placeholder="Describe your product in detail..."
                                                required
                                            />
                                            <InputError message={errors.description} className="mt-2 text-red-500" />
                                        </div>

                                        {/* Image Upload */}
                                        <div className="group">
                                            <Label htmlFor="image" className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                                Update Product Image (Optional)
                                            </Label>
                                            
                                            <div className="relative">
                                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20">
                                                    <div className="text-center">
                                                        <Upload className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
                                                        <div className="flex text-sm leading-6 text-slate-600 dark:text-slate-400">
                                                            <label
                                                                htmlFor="image"
                                                                className="relative cursor-pointer rounded-md bg-white dark:bg-slate-800 font-semibold text-emerald-600 dark:text-emerald-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500 px-2 py-1"
                                                            >
                                                                <span>Upload new image</span>
                                                                <Input
                                                                    id="image"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={handleImageChange}
                                                                    className="sr-only"
                                                                />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Upload Progress */}
                                                {progress && (
                                                    <div className="mt-4">
                                                        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                            <span>Uploading...</span>
                                                            <span>{progress.percentage}%</span>
                                                        </div>
                                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300 ease-out" 
                                                                style={{ width: `${progress.percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <InputError message={errors.image} className="mt-2 text-red-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Previews */}
                                <div className="space-y-6">
                                    {/* Current Image */}
                                    {currentImageUrl && !newImagePreview && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <ImageIcon className="h-5 w-5" />
                                                Current Image
                                            </h3>
                                            <div className="relative group">
                                                <img 
                                                    src={currentImageUrl} 
                                                    alt={product.name} 
                                                    className="h-48 w-48 rounded-2xl object-cover shadow-lg border border-slate-200 dark:border-slate-700 group-hover:shadow-xl transition-all duration-300"
                                                />
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* New Image Preview */}
                                    {newImagePreview && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <RefreshCw className="h-5 w-5 text-emerald-600" />
                                                New Image Preview
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Current Image (smaller) */}
                                                {currentImageUrl && (
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Previous Image</p>
                                                        <div className="relative group">
                                                            <img 
                                                                src={currentImageUrl} 
                                                                alt="Previous image" 
                                                                className="h-32 w-32 rounded-xl object-cover shadow-md border border-slate-200 dark:border-slate-700 opacity-75"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {/* New Image */}
                                                <div>
                                                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">New Image</p>
                                                    <div className="relative group">
                                                        <img 
                                                            src={newImagePreview} 
                                                            alt="New image preview" 
                                                            className="h-48 w-48 rounded-2xl object-cover shadow-lg border-2 border-emerald-200 dark:border-emerald-700 group-hover:shadow-xl transition-all duration-300"
                                                        />
                                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                            New
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-end">
                                        <Button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />
                                                    Updating Product...
                                                </>
                                            ) : (
                                                <>
                                                    <RefreshCw className="mr-3 h-5 w-5" />
                                                    Update Product
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}