<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Pinjaman;
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
        if (Auth::guard('admin')->check()) {
            try {
                $request->validate([
                    'username' => 'required|string',
                    'email' => 'required|email',
                    'name' => 'required|string',
                    'password' => 'required|string',
                    'image' => 'image|nullabel'
                ]);

                // check email sudah ada atau belum

                if(Member::where('username', $request->input('username'))->first()) {
                    return response()->json(['message' => 'Anggota dengan username ini sudah ada!'], 401);
                } else if (Member::where('email', $request->input('email'))->first()) {
                    return response()->json(['message' => 'Anggota dengan email ini sudah ada!'], 401);
                }

                Member::create([
                    'id_member' => Str::uuid(),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                    'name' => $request->input('name'),
                    'password' => Hash::make($request->input('password'))
                ]);

                $newMember = Member::orderBy('created_at', 'desc')->first();

                Pinjaman::create([
                    'id_pinjaman' => Str::uuid(),
                    'id_member' => $newMember->id_member
                ]);

                return response()->json(['message' => 'Berhasil Menambahkan anggota'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal Menambahkan anggota, silahkan coba kembali!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
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
