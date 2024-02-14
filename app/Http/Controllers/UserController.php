<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    private function getUserLogin()
    {
        if (Auth::guard('admin')->check()) {
            return Auth::guard('admin')->user();
        } else {
            return Auth::guard('member')->user();
        }
    }

    public function index()
    {
        $user = $this->getUserLogin();
        return Inertia::render('Profile', ['data' => $user]);
    }

    public function createUser(Request $request)
    {
        $validate = $request->validate([
            'username' => 'required|string|unique:users,username',
            'name' => 'required|string',
            'image' => 'image|file|max:2048',
            'password' => 'required|string'
        ]);

        if ($validate) {
            try {
                if ($request->file('image')) {
                    $path = $request->file('image')->store('user_profile');
                    User::create([
                        'username' => $request->input('username'),
                        'name' => $request->input('name'),
                        'image' => $path,
                        'role' => 'admin',
                        'passsword' => Hash::make($request->input('password')),
                    ]);
                    return response()->json(['message' => 'Berhasil menambahkan admin'], 200);
                }
                return response()->json(['message' => 'Terjadi kesalahan, silahkan coba lagi!'], 409);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Gagal menambahkan, silahkan coba lagi!'], 500);
            }
        }

        return response()->json(['message' => 'Terjadi kesalahan, silahkan coba lagi!'], 500);
    }

    public function updateProfile(Request $request)
    {
        $user = $this->getUserLogin();
        $path = $request->file('image')->store('user_profile');
        
        if ($user->role) {
            $getUser = User::where('id', $user->id)->first();
            // dd($getUser->id);
            Storage::delete($getUser->image);
            $getUser->update([
                'username' => $request->input('username') ? $request->input('username') : $getUser->username,
                'name' => $request->input('name') ? $request->input('name') : $getUser->name,
                'image' => $request->file('image') ? $path : $getUser->image,
            ]);
        }

        // $getUser = Member::where('id_member', $user->id_member)->first();
    }
}
