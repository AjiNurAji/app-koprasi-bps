<?php

namespace App\Http\Controllers;

use App\Models\AdArt;
use App\Models\Files;
use App\Models\Folders;
use App\Models\SubFolders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function adArt(Request $request)
    {
        if (!Auth::guard("admin")->check()) return response()->json(["message" => "Hanya bisa diakses oleh admin!"], 401);

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

    public function uploadFile(Request $request)
    {
        if (!Auth::guard("admin")->check()) return response()->json(["message" => "Hanya bisa diakses oleh admin!"], 401);

        $request->validate([
            "files" => "array|required",
        ]);

        try {
            $author = Auth::guard("admin")->user();

            foreach ($request->file("files") as $i => $file) {
                $fileName = $file->getClientOriginalName();
                $path = $file->storeAs("/laporan-rat", $fileName);

                Files::create([
                    "id_file" => Str::uuid(),
                    "author" => $author->name,
                    "filename" => $fileName,
                    "type" => $file->getClientOriginalExtension(),
                    "mimeType" => $file->getClientMimeType(),
                    "path" => $path,
                ]);
            }

            return response()->json(["message" => "Berhasil mengupload " . sizeof($request->file("files"))], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Gagal mengupload file!"], 500);
        }
    }
}
