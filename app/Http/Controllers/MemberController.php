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

                return response()->json(['message' => 'Berhasil Menambahkan anggota'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal Menambahkan anggota, silahkan coba kembali!'], 500);
            }
        }

        return response()->json(['message' => 'Hanya bisa di akses oleh admin!'], 401);
    }

    public function editData(string $uuid) {
        try {
            $member = Member::findOrFail($uuid);
            

        }
        catch (\Exception $th) {
            return response()->json(['message'=> 'Data tidak ditemukan'],404);
        }
    }

    public function softDeleteData(string $uuid) {
        $member = Member::findOrFail($uuid);

        if ($member) {
            $member->delete();
            return response()->json(['message' => 'Berhasil menghapus anggota'], 200);
        } else {
            return response()->json(['message'=> 'Gagal menghapus anggota'], 401);
        }
        
    //     $user->delete();
    //     return response()->json(['message' => 'Berhasil Menghapus anggota'], 200);
    }

    public function updatedata(Request $request, string $uuid) {
        $request->validate([
            'username'=> 'nullable|string',
            'name' => 'nullable|string',
            'NIP'=> 'nullable|string',
            'password'=> 'nullable|string',
            'old_password'=> 'nullable|string',
            'no_hp'=> 'nullable|string'
        ]);
        try {
            $member = Member::findOrFail($request->input('id_member'));

            
            
            $updateData = $member->update([
                'username'=> $request->input('username'),
                'name'=> $request->input('name'),
                'email'=> $request->input('email'),
            ]);
            
            if ($request->input('password') && $request->input('old_password')) {
                if(Hash::check($request->old_password, $member->password)) {    
                    $member->update([
                        'password'=> Hash::make($request->input('password')),
                    ]);
                } else {
                    return response()->json(['message'=> 'error, password yang anda masukan salah'], 401);
                }
            }

            // if ($requst->input('password') !== null) {
            //     $updateData = $member->update([
            //         'password' => Hash::make($requst->input('password')),
            //         ]);
            if ($updateData) {
                if ($request->input('id_member') != $request->input('')) {
                $url = "/uuid/{$request->input('id_member')}";
                return response()->json(['message'=> 'Update berhasil diperbaharui'], 200);
    
                // return redirect($url);
            } else {
                return response()->json(['message'=> 'Update berhasil diperbaharui'], 200);
    
                // return redirect()->back();
            }
            } else {
                return response()->json(['message'=> 'Update gagal, cek kembali data yang anda masukan'], 401);
    
                // return redirect()->back()->withInput();
            }      
            // $user = Auth::user();
            // $user->update($request->all());
            // return response()->json(['message' => 'Berhasil Update anggota'], 200);
        } catch (\Exception $e) {
            // return response()->json(["message"=> $e->getMessage()], 400);
            return response()->json(['message' => 'Update gagal, cek kembali data yang anda masukan'], 401);
            // return redirect()->back();
        }
    }

    public function update_password(Request $request, string $uuid) {
        $request->validate([
            'old_password' => 'required',
            'new_password'=> 'required',
            'confirm_password' => 'required'
        ]);
 
        $member = Member::findOrFail($uuid);

        if(Hash::check($request->old_password, $member->password)) {

            $member->update([
                'password'=> Hash::make($request->new_password)
            ]);

            return response()->json(['message'=> 'Berhasil mengganti password'], 200);

        } else {
            return response()->json(['message'=> 'Error, password yang anda masukan salah'], 401);
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
