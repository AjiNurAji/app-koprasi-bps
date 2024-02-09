<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananPokok extends Model
{
    use HasFactory;

    protected $table = 'simpanan_pokok';

    protected $primaryKey = 'id_simpanan_pokok';

    protected $keyType = 'string';

    protected $fillable = [
        'id_simpanan_pokok',
        'id_member',
        'tahun',
        'bulan',
        'awal_tahun',
        'anggota_keluar',
        'anggota_masuk'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
