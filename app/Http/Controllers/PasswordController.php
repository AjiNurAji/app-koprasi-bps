<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function index()
    {
        return Inertia::render("Auth/ForgotPassword");
    }

    public function getUser(Request $request)
    {
        $request->validate([
            "nip" => "required"
        ]);

        $user = Member::where("NIP", $request->input("nip"))->first();

        if (!$user) return response()->json(["message" => "Data tidak ditemukan!"], 500);

        return response()->json(["message" => "Data ditemukan", "user" => $user], 200);
    }

    public function updatePassword(Request $request, string $id)
    {
        $request->validate([
            "new_password" => "required|string"
        ]);

        $user = Member::findOrFail($id);

        try {
            $user->update([
                "password" => Hash::make($request->input("new_password")),
            ]);

            return response()->json(["message" => "Berhasil mengganti password"], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Gagal megganti password!"], 500);
        }
    }
}
