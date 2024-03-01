<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PiutangAnggota extends Model
{
    use HasFactory;

    protected $table = 'PiutangAnggota';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_anggota',
        'piutang_lama',
        'piutang_baru',
        'cicilan',
        'bayar_langsung',
        'total_bayar',
        'sisa_piutang',
        'tahun',
        'bulan'
    ];
}
