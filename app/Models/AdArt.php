<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdArt extends Model
{
    use HasFactory;

    protected $table = "ad_art";

    protected $primaryKey = "id_ad_art";

    protected $key = "string";

    protected $fillable = [
        "id_ad_art",
        "path",
        "filename",
    ];
}
