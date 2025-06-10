<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Cart;
use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
                        ->with('orderDetails.product')
                        ->orderBy('created_at', 'desc')
                        ->get();
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    public function store(Request $request)
    {
        $userId = Auth::id();
        $user = User::findOrFail($userId); 
        $cartItems = Cart::with('product')->where('user_id', $userId)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();
        try {
            $totalPrice = 0;
            foreach ($cartItems as $item) {
                if ($item->quantity > $item->product->stock) {
                    DB::rollBack();
                    return redirect()->route('cart.index')->with('error', 'Not enough stock for ' . $item->product->name);
                }
                $totalPrice += $item->product->price * $item->quantity;
            }

            if ($user->money < $totalPrice) {
                DB::rollBack();
                return redirect()->route('cart.index')->with('error', 'Not enough money to place the order. Please top up your balance.');
            }

            $order = Order::create([
                'user_id' => $userId,
                'total_price' => $totalPrice,
            ]);

            foreach ($cartItems as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            $user->decrement('money', $totalPrice);

            Cart::where('user_id', $userId)->delete();

            DB::commit();

            return redirect()->route('orders.show', $order->id)->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cart.index')->with('error', 'Failed to place order. Please try again. ' . $e->getMessage());
        }
    }

    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $order->load('orderDetails.product', 'user');
        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    public function allOrders()
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            abort(403);
            json_encode(['error' => 'Unauthorized action.']);
            return;
        }
        $orders = Order::with('orderDetails.product', 'user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Orders/Index', ['orders' => $orders]); // View admin
    }

}