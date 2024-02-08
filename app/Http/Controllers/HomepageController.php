<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SimpananPokok;


class HomepageController extends Controller
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

        return Inertia::render('Dashboard', ['user' => $user]);
    }

    public function simpananPokok()
    {
        $simpananPokok = SimpananPokok::all();
        return Inertia::render('admin/Simpanan/Pokok', ['data' => $simpananPokok]);
    }
}
