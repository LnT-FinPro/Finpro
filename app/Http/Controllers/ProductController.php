<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; // Import Auth

class ProductController extends Controller
{

    public function index(Request $request)
{
    $query = Product::withCount('reviews')
                    ->withAvg('reviews', 'rating');

    if ($request->filled('search')) {
        $query->where(function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->search . '%')
              ->orWhere('description', 'like', '%' . $request->search . '%');
        });
    }

    if ($request->filled('min_price')) {
        $query->where('price', '>=', $request->min_price);
    }

    if ($request->filled('max_price')) {
        $query->where('price', '<=', $request->max_price);
    }

    $products = $query->paginate(10)->withQueryString();

    $data = [
        'products' => $products,
        'filters' => $request->only(['search', 'min_price', 'max_price']),
    ];

    if (Auth::check() && Auth::user()->role === 'admin') {
        return Inertia::render('Admin/Products/Index', $data); 
    }

    return Inertia::render('Products/Index', $data); 
}



    public function show(Product $product)
    {
        $product->load('reviews.user');
        if (Auth::check() && Auth::user()->role === 'admin') {
            return Inertia::render('Admin/Products/Show', ['product' => $product]); 
        } else {
            return Inertia::render('Products/Show', ['product' => $product]);
        }
    }

    public function create()
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            return Inertia::render('Admin/Products/Create'); 
        }
    }

    public function store(Request $request)
    {
        // Hanya Admin
        // if (!Auth::check() || !Auth::user()->isAdmin()) {
        //     abort(403, 'Unauthorized action.');
        // }
        $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'required|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('product_images', 'public');
        }

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imagePath,
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        // Hanya Admin
        // if (!Auth::check() || !Auth::user()->isAdmin()) {
        //     abort(403, 'Unauthorized action.');
        // }
        return Inertia::render('Admin/Products/Edit', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        // Hanya Admin
        // if (!Auth::check() || !Auth::user()->isAdmin()) {
        //     abort(403, 'Unauthorized action.');
        // }
        $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'required|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $product->image;
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $imagePath = $request->file('image')->store('product_images', 'public');
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imagePath,
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // Hanya Admin
        // if (!Auth::check() || !Auth::user()->isAdmin()) {
        //     abort(403, 'Unauthorized action.');
        // }
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}