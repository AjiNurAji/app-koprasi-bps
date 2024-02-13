<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KasTunai extends Model
{
    use HasFactory;

    protected $table = 'kas_tunai';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'bulan',
        'masuk',
        'keluar',
        'saldo',
        'tahun',
        'saldo_awal',
    ];
}
