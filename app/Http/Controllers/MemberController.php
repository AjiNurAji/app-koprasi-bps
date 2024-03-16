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
     * Display a create page for add the members
     */
    public function create()
    {
        return Inertia::render("admin/Member/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            try {
                $request->validate([
                    'nip' => 'required|string',
                    'no_hp' => 'required|max:13',
                    'name' => 'required|string',
                    'password' => 'required|string'
                ]);

                // check email sudah ada atau belum

                if (Member::where('NIP', $request->input('nip'))->first()) {
                    return response()->json(['message' => 'Anggota dengan NIP ini sudah ada!'], 401);
                }

                Member::create([
                    'id_member' => Str::uuid(),
                    'NIP' => $request->input('nip'),
                    'no_hp' => $request->input('no_hp'),
                    'name' => $request->input('name'),
                    'password' => Hash::make($request->input('password'))
                ]);

                return response()->json(['message' => 'Berhasil Menambahkan anggota'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal Menambahkan anggota, silahkan coba kembali!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function editData(string $uuid)
    {
        try {
            $member = Member::findOrFail($uuid);

            return Inertia::render('admin/Member/Edit', ['member' => $member]);
        } catch (\Exception $th) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
    }

    public function softDeletes(string $id)
    {
        $member = Member::findOrFail($id);

        if ($member) {
            $member->update([
                'is_deleted' => 1,
            ]);
            return response()->json(['message' => 'Anggota akan otomatis terhapus pada tahun berikutnya!'], 200);
        } else {
            return response()->json(['message' => 'Data member tidak ditemukan!'], 401);
        }
    }

    public function permanentDeletes(string $id)
    {
        $member = Member::findOrFail($id);

        if ($member) {
            $member->delete();
            return response()->json(['message' => 'Berhasil menghapus anggota'], 200);
        } else {
            return response()->json(['message' => 'Data member tidak ditemukan!'], 401);
        }
    }

    public function updatedata(Request $request)
    {
        $request->validate([
            'id_member' => 'required|string',
            'name' => 'nullable|string',
            'nip' => 'nullable|string',
            'new_password' => 'nullable|string',
            'no_hp' => 'nullable|string|max:13'
        ]);
        try {
            $member = Member::findOrFail($request->input('id_member'));

            $member->update([
                'NIP' => $request->input('nip'),
                'name' => $request->input('name'),
                'no_hp' => $request->input('no_hp'),
            ]);

            // jika ada password
            if (!$request->input('new_passwod'))
                $member->update([
                    'password' => Hash::make($request->input('new_password')),
                ]);

            return response()->json(['message' => 'Data berhasil diperbaharui'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Data gagal diperbaharui, cek kembali data yang anda masukan'], 500);
        }
    }

    public function update_password(Request $request, string $uuid)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required',
            'confirm_password' => 'required'
        ]);

        $member = Member::findOrFail($uuid);

        if (Hash::check($request->old_password, $member->password)) {

            $member->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json(['message' => 'Berhasil mengganti password'], 200);
        } else {
            return response()->json(['message' => 'Error, password yang anda masukan salah'], 401);
        }
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
