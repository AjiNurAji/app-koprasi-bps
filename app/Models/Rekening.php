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
        'bulan',
        'tahun',
    ];

    public function saldo()
    {
        return $this->hasOne(Kas::class, 'id_kas');
    }
}