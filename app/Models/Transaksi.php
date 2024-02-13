<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksi';

    protected $primaryKey = 'id_transaksi';

    protected $keyType = 'string';

    protected $fillable = [
        'id_transaksi',
        'id_member',
        'nominal',
        'nama_transaksi',
        'hari',
        'bulan',
        'tahun',
        'type'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
