<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Facades\Auth;
use App\Models\SimpananSukarela;

class SimpananSukarelaController extends Controller
{
    
    public function SimpananSukarela(Request $request)
    {
        // get user login
        $user = Auth::user();
        $check = user->role ? user->role=== 'admin':false;

        if ($check) {
            try {
                //validasi request
                $request->validate([
                    'nama' => 'required',
                    'sukarela_dari_pembulatan' => 'required',
                    'SHU' => 'required',
                    'awal' => 'required',
                    'selama_tahun' => 'required',
                    'diambil' => 'required',
                    'disimpan_kembali' => 'required',
                    'akhir' => 'required',
                    'tahun' => 'required',
                    'nominal' => 'required'
                ]);

                SimpananSukarela::create([
                    'nama' => $request->input('nama'),
                    'sukarela_dari_pembulatan' => $request->input('sukarela_dari_pembulatan'),
                    'SHU' => $request->input('SHU'),
                    'awal' => $request->input('awal'),
                    'selama_tahun' => $request->input('selama_tahun'),
                    'diambil' => $request->input('diambil'),
                    'disimpan_kembali' => $request->input('disimpan_kembali'),
                    'akhir' => $request->input('akhir'),
                    'tahun' => $request->input('tahun'),
                    'nominal' => $request->input('nominal')
                ]);

                return response()->json(['message' => 'Berhasil melakukan login'], 200);
            } catch (\Thowrable $th) {
               return response()->json(['message' => 'Gagal Login, coba lagi nanti!'], 500);
            }
        }

                return response()->json(['message' => 'Sorry, anda bukan admin'], 401);
    }

    public function ambilSimpananSukarela(Request $request) {
        if (Auth::guard('admin')->check()) {

            $member = Member::where('NIP', $request->input('nip'))->first();

            $get = SimpananSukarela::where([
                ['id_member', $member->id_member],
            ])
            ->orderBy('created_at', 'desc')
            ->get()
            ->first();
        }

        if (!$piutangAnggota) {
            return response()->json(['message' => 'Mohon isi data anggota'], 404);
        }
    }
}
