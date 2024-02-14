<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kas extends Model
{
    use HasFactory;

    protected $table = 'kas';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'saldo_awal',
        'tahun'
    ];
}
