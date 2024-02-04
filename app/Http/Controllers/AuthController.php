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
                'password' => $request->input('password'),
            ];

            if (Auth::guard('admin')->attempt($credentials)) {
                $request->session()->regenerate();
                return response()->json(['message' => 'Berhasil Login 👋'], 200);
            }

            return response()->json(['message' => 'Gagal login, silahkan coba lagi!'], 401);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Server error, silahkan coba lagi!'], 500);
        }
    }

    public function processLoginMember(Request $request)
    {
        try {
            // validate request
            $request->validate([
                'email' => 'required',
                'password' => 'required',
            ]);

            // credentials
            $credentials = [
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ];

            if (Auth::guard('member')->attempt($credentials)) {
                $request->session()->regenerate();
                return response()->json(['message' => 'Berhasil Login 👋'], 200);
            }

            return response()->json(['message' => 'Gagal login, silahkan coba lagi!'], 401);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Server error, silahkan coba lagi!'], 500);
        }

    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
