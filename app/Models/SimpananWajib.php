<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananWajib extends Model
{
    use HasFactory;

    protected $table = 'simpanan_wajib';

    protected $primaryKey = 'id_simpanan_wajib';

    protected $keyType = 'string';

    protected $fillable = [
        'id_simpanan_wajib',
        'id_member',
        'tahun',
        'bulan',
        'hari',
        'kekayaan_awal_tahun',
        'anggota_keluar',
        'simpanan_wajib'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
