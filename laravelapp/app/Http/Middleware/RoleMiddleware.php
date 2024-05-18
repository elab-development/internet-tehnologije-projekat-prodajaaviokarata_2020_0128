<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Proveravamo da li je korisnik prijavljen i da li njegova uloga odgovara zadatoj ulozi
        if (Auth::check() && Auth::user()->role == $role) {
            // Ako je uslov zadovoljen, prosleđujemo zahtev dalje
            return $next($request);
        }

        // Ako korisnik nije autorizovan, vraćamo odgovor sa statusom 403 (Forbidden)
        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
