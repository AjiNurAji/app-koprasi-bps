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
        'name',
        'id_member',
        'nominal',
        'tanggal_transaksi',
        'nama_transaksi',
        'nominal_keluar',
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
