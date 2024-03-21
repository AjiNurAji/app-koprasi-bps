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
        $request->validate([
            'username' => 'required|string',
            'name' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('username', $request->input('username'))->get()->first();

        if ($user) return response()->json(['message' => 'Admin dengan username telah tersedia!'], 500);

        try {

            User::create([
                'username' => $request->input('username'),
                'name' => $request->input('name'),
                'role' => 'admin',
                'password' => Hash::make($request->input('password')),
            ]);

            return response()->json(['message' => 'Berhasil menambahkan admin'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Gagal menambahkan, silahkan coba lagi!'], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            "image" => "nullable",
            "username" => "nullable",
            "nip" => "nullable",
            "name" => "nullable",
            "old_password" => "nullable",
            "new_password" => "nullable",
        ]);

        $user = $this->getUserLogin();

        // $file = $request->file("image");
        // $fileName = time() . "-" . $user->username . "." . $file->getClientOriginalExtension();

        // dd($request->file("image")->storeAs("public/user_profile", $fileName));
        if ($user->role) {
            $getUser = User::where('id', $user->id)->first();
            $getUser->update([
                'username' => $request->input('username') ? $request->input('username') : $getUser->username,
                'name' => $request->input('name') ? $request->input('name') : $getUser->name,
            ]);

            // if user change image
            if ($request->file("image")) {
                $file = $request->file("image");
                $fileName = time() . "-" . $user->username . "." . $file->getClientOriginalExtension();

                $request->file("image")->storeAs("public/user_profile", $fileName);
                
                $pathDb = "user_profile/" . $fileName;
                if ($getUser->image) Storage::delete($getUser->image);

                $getUser->update([
                    "image" => $pathDb,
                ]);
            };

            // if user change password
            if ($request->input("new_password")) {
                if (!Hash::check($request->input("old_password"), $getUser->password)) return response()->json(["message" => "Old Password tidak sama!"], 500);

                $getUser->update([
                    "password" => Hash::make($request->input("new_password")),
                ]);
            }

            return response()->json(["message" => "Data berhasil di update"], 200);
        }

        // $getUser = Member::where('id_member', $user->id_member)->first();
    }
}
