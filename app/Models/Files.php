<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;
    protected $table = "files";

    protected $primaryKey = "id_file";

    protected $keyType = "string";

    protected $fillable = [
        "id_file",
        "filename",
        "author",
        "path",
        "type",
        "mimeType"
    ];
}
