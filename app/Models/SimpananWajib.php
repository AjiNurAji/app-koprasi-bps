<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananWajib extends Model
{
    use HasFactory;

    protected $table = 'simpanan_wajib';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nama',
        'bulan',
        'tahun',
        'kekayaan_alam',
        'simpanan_wajib',
        'anggota_keluar',
        'kekayaan_akhir',
        'nominal'
    ];
}
