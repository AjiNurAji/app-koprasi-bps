<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shu extends Model
{
    use HasFactory;

    protected $table = 'Shu';

    protected $primaryKey ='id';

    protected $fillable = [
        'nama',
        'simpanan',
        'pinjaman',
        'jumlah',
        'anggota_keluar',
        'total',
        'dibagi_RAT',
        'disimpan_awal'
    ];
}
