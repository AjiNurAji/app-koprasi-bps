<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmbilSimpanan extends Model
{
    use HasFactory;

    protected $table = 'ambil_simpanan';

    protected $primaryKey = '_id';

    protected $keyType = 'string';

    protected $fillable = [
        '_id',
        'id_member',
        'tanggal_ambil',
        'nominal',
        'note',
        'simpanan'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'id_member');
    }
}
