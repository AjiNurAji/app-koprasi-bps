<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrTunai extends Model
{
    use HasFactory;

    protected $table = "tr_tunai";

    protected $primaryKey = 'id_tr_tunai';

    protected $keyType = 'string';

    protected $fillable = [
        'id_tr_tunai',
        'id_tunai',
        'nominal',
        'tanggal_transaksi',
        'type',
        'saldo'
    ];

    public function tunai()
    {
        return $this->belongsTo(Tunai::class, "id_tunai");
    }
}
