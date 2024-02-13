<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JasaBank extends Model
{
    use HasFactory;

    protected $table = 'JasaBank';

    protected $primaryKey = 'id';

    protected $fillable = [
        'bulan',
        'debet',
        'kredit',
        'saldo',
        'bunga_bank',
        'pajak',
        'ADM',
        'nominal'
    ];
}
