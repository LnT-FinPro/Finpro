<?php

namespace App\Http\Middleware; // Pastikan namespace ini benar

use Closure;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware extends Middleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->isAdmin()) { // Asumsi ada method isAdmin() di model User
            return $next($request);
        }

        return redirect()->route('products.index')->with('error', 'You do not have permission to access this page.');
    }
}