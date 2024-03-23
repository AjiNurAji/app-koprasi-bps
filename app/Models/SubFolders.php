<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubFolders extends Model
{
    use HasFactory;

    protected $table = "sub_folders";

    protected $primaryKey = "id_folder";

    protected $keyType = "string";

    protected $fillable = [
        "id_folder",
        "parent_folder",
        "path",
        "author",
        "name",
        "type"
    ];
}
