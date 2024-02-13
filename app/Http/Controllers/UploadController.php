<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Upload;

class UploadController extends Controller
{

    public function index()
    {
        $files = Upload::all();

        foreach ($files as $file) {
            // return '<img src=' . asset($file->path) . '" alt="">';
        }
    }

    public function upload(Request $request)
    {
        try {
        // $path = $request->file('image')->store('photo');
        // $path = Storage::putFile('public', $request->file('image'));
        // $path = $request->file('image')->storeAs('public', 'gambar');
        $file = $request->file('image');
        $name = time();
        $extension = $file->getClientOriginalExtension();
        $newName = $name . '.' . $extension;
    
        // $path = $request->file('image')->storeAs('public', #newName);
        $size = $file->getClientSize();
        Storage::putFileAs('storage/file', $request->file('image'), $newName);

        $data = [
            'path' => 'storage/' . $newName,
            'size' => $size
        ];

        Upload::create($data);
        
            return Upload::create($data);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    
        //dd($path);
    }


    public function list()
    {
        // $files = Storage::allFiles('public');
        // $directories = $Storage::allDirectories('');
        // $directory = Storage::makeDirectory('image/gif');
        $directory = Storage::deleteDirectory('image/gif');
        dd($directory);
    }
    
    public function show()
    {
        // $path = Storage::url('');
        // return '<img src=>' . asset('/storage/jijij.jpg')  '" alt="">';
    }
    
}
