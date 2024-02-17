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
        'type',
        'saldo'
    ];

    public function rekening()
    {
        return $this->hasOne(Rekening::class, 'id_rekening');
    }
}
