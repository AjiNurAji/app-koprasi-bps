<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekeningBank extends Model
{
    use HasFactory;

    protected $table = 'rekeningBank';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'bulan',
        'debet',
        'kredit',
        'saldo',
        'saldo_awal',
        'setor',
        'bunga_bank',
        'pajak',
        'ADM',
        'penarikan',
        'nominal',
        'tahun',
    ];
}
