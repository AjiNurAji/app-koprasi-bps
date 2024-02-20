<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananSukarela extends Model
{
    use HasFactory;

    protected $table = 'simpanan_sukarela';

    protected $primaryKey = 'id_simpanan_sukarela';

    protected $keyType = 'string';

    protected $fillable = [
        'id_simpanan_sukarela',
        'id_member',
        'sukarela',
        'shu',
        'awal_tahun',
        'selama_tahun',
        'diambil',
        'disimpan_kembali',
        'akhir_tahun',
        'tahun',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
