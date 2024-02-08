<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        // $path = $request->file('image')->store('photo');
        // $path = Storage::putFile('public', $request->file('image'));
        // $path = $request->file('image')->storeAs('public', 'gambar');
        $file = $request->file('image');
        $name = time();
        $extension = $file->getClientOriginalExtension();
        $newName = $name . '.' . $extension;
    
        // $path = $request->file('image')->storeAs('public', #newName);
        $size = $file->getClientSize();
        $path = Storage::putFileAs('photo', $request->file('image'), $newName);

        $data = [
            'path' => $path,
            'size' => $size
        ];

        Upload::create($data);
    
        dd($path);
    }
}
