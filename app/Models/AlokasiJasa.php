<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlokasiJasa extends Model
{
    use HasFactory;

    protected $table = 'AlokasiJasa';

    protected $primaryKey = 'id';

    protected $fillable = [
        'tanggal_tutup_buku',
        'bulan',
        'uraian',
        'jasa_anggota',
        'operasional',
        'jasa_bersih',
        'shu_simpanan',
        'shu_pinjaman',
        'total_shu',
        'dana_sosial',
        'dana_cadangan',
        'dana_pengurus',
        'tahun'
    ];
}
