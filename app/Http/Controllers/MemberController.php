<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::orderBy('name', 'asc')->get();
        return Inertia::render('admin/Member/Members', ['members' => $members]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // get user logined
        
        $user = Auth::user();
        $check = $user->role ? $user->role === 'admin' : false;
        
        if ($check) {
            try {
                $request->validate([
                    'username' => 'required|string|unique:members,username',
                    'email' => 'required|email|unique:members,email',
                    'name' => 'required|string',
                    'password' => 'required|string',
                ]);

                Member::create([
                    'id_member' => Str::uuid(),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                    'name' => $request->input('name'),
                    'password' => Hash::make($request->input('password'))
                ]);

                return response()->json(['message' => 'Berhasil Menambahkan anggota'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal Menambahkan anggota, silahkan coba kembali!'], 500);
            }
        }

        return response()->json(['message' => 'Sorry, hanya admin yang dapat menambah anggota!'], 401);
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
