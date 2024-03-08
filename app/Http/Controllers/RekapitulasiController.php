<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SimpananWajib;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RekapitulasiController extends Controller
{
    public function simpananWajib(Request $request)
    {
        if (!Auth::guard('admin')->check()) return response()->json(['message' => 'Hanya bisa diakses oleh admin!']);

        $simpananWajib = SimpananWajib::whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])->get()->toArray();
        
    }
}
