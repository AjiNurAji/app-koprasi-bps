<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::guard('admin')->check() || Auth::guard('member')->check()) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Auth/Login');
    }

    /**
     * Function login checked
     */
    public function processLogin(Request $request)
    {
        try {
            // validate request
            $request->validate([
                'username' => 'required',
                'password' => 'required',
            ]);

            // credentials
            $credentials = [
                'username' => $request->input('username'),
                'password' => $request->input('password')
            ];

            $credentialsMember = [
                'email' => $request->input('username'),
                'password' => $request->input('password')
            ];

            if (Auth::guard('admin')->attempt($credentials) || Auth::guard('member')->attempt($credentials)) {
                $request->session()->regenerate();
                return response()->json(['message' => 'Berhasil Login.'], 200);
            } else if (Auth::guard('member')->attempt($credentialsMember)) {
                $request->session()->regenerate();
                return response()->json(['message' => 'Berhasil Login.'], 200);
            }

            return response()->json(['message' => 'Gagal login, silahkan coba lagi!'], 401);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Server error, silahkan coba lagi!'], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->session()->flush();
        Auth::logout();
        return response()->json(['message' => 'Logout berhasil.'], 200);
    }
}
