<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpananSukarela extends Model
{
    use HasFactory;

    protected $table = 'SimpananSukarela';

    protected $primaryKey = 'id';

    protected $fillable = [
        'nama',
        'sukarela_dari_pembulatan',
        'SHU',
        'awal',
        'selama_tahun',
        'diambil',
        'disimpan_kembali',
        'akhir',
        'tahun',
        'nominal'
    ];
}
