<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JasaAnggota extends Model
{
    use HasFactory;

    protected $table = 'jasa_pinjaman_anggota';

    protected $primaryKey = 'id';

    protected $fillable = ['persentase'];
}
