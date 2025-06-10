<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register'); // Pastikan path view Inertia benar
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'money' => 'nullable|numeric|min:0|max:1000000', // Validasi untuk saldo awal
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // Otomatis set role ke 'user'
            'money' => $request->money ?? 0.00, // Set saldo, default 0 jika tidak diisi
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Pengalihan berdasarkan peran setelah registrasi (opsional di sini,
        // biasanya login yang menangani)
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard'); // Ganti dengan rute admin Anda
        }
        return redirect()->route('dashboard'); // Atau rute default setelah registrasi
    }
}