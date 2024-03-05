<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjaman extends Model
{
    use HasFactory;

    protected $table = 'pinjaman';

    protected $primaryKey = 'id_pinjaman';

    protected $keyType = 'string';

    protected $fillable = [
        'id_pinjaman',
        'id_member',
        'bulan',
        'nominal',
        'hari',
        'tahun',
        'bank_tujuan',
        'untuk_keperluan',
        'jangka_waktu',
        'no_rek',
        'tanggal_pinjam',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }

    public function bayar()
    {
        return $this->hasMany(BayarPinjaman::class, 'id_pinjaman');
    }
}
