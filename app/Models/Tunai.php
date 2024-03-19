<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tunai extends Model
{
    use HasFactory;

    protected $table = 'tunai';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'id_kas',
        'bulan',
        'tahun',
        'tanggal_transaksi',
    ];

    public function kas()
    {
        return $this->hasOne(Kas::class, 'id_kas');
    }
}
