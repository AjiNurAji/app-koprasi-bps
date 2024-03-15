<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrRekening extends Model
{
    use HasFactory;

    protected $table = 'tr_rekening';

    protected $primaryKey = 'id_tr_rekening';

    protected $keyType = 'string';

    protected $fillable = [
        'id_tr_rekening',
        'id_rekening',
        'nominal',
        'rekening',
        'tanggal_transaksi',
        'type',
        'saldo'
    ];

    public function dataRekening()
    {
        return $this->belongsTo(Rekening::class, 'id_rekening');
    }
}
