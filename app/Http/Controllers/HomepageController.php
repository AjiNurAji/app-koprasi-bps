<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        return Inertia::render('admin/Simpanan/Pokok');
    }
}
