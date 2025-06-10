<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $userId = Auth::id();

        $hasPurchased = OrderDetail::whereHas('order', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('product_id', $product->id)->exists();

        if (!$hasPurchased) {
            return back()->with('error', 'You can only review products you have purchased.');
        }

        $existingReview = Review::where('user_id', $userId)->where('product_id', $product->id)->exists();
        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Review::create([
            'user_id' => $userId,
            'product_id' => $product->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->route('products.show', $product->id)->with('success', 'Review submitted successfully.');
    }

    public function update(Request $request, Review $review)
    {
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($request->only('rating', 'comment'));

        return redirect()->route('products.show', $review->product_id)->with('success', 'Review updated successfully.');
    }

    public function destroy(Review $review)
    {
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $productId = $review->product_id;
        $review->delete();

        return redirect()->route('products.show', $productId)->with('success', 'Review deleted successfully.');
    }
}
