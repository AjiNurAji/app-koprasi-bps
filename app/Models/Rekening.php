<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekening extends Model
{
    use HasFactory;

    protected $table = 'rekening';

    protected $primaryKey = 'id_rekening';

    protected $keyType = 'string';

    protected $fillable = [
        'id_rekening',
        'id_kas',
        'tanggal_transaksi',
        'bulan',
        'tahun',
    ];

    public function saldo()
    {
        return $this->belongsTo(Kas::class, 'id_kas');
    }
}