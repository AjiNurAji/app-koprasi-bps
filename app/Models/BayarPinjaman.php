<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BayarPinjaman extends Model
{
    use HasFactory;

    protected $table = 'bayar_pinjaman';

    protected $primaryKey = 'id_bayar_pinjaman';

    protected $keyType = 'string';

    protected $fillable = [
        'id_bayar_pinjaman',
        'id_member',
        'id_pinjaman',
        'name',
        'bulan',
        'hari',
        'tahun',
        'nominal',
        'note',
        'method',
        'tanggal_bayar',
        'sisa',
        'jenis',
    ];

    public function pinjaman() 
    {
        return $this->belongsTo(Pinjaman::class, 'id_pinjaman');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
