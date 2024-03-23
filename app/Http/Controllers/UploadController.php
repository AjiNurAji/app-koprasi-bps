<?php

namespace App\Http\Controllers;

use App\Models\AdArt;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function adArt(Request $request)
    {
        $request->validate([
            "file" => "file|required"
        ]);

        // dd($request->file("file"));
        $file = $request->file("file");
        $originalFilename = $file->getClientOriginalName();
        $filename = time() . "-" . date("Y") . "." . $file->getClientOriginalExtension();

        // upload
        try {
            $path = $request->file("file")->storeAs("/ad_art", $filename);

            AdArt::create([
                "id_ad_art" => Str::uuid(),
                "path" => $path,
                "filename" => $originalFilename,
            ]);

            return response()->json(["message" => "Berhasil menambahkan file"], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Gagal menambahkan file!"], 500);
        }
    }
}
