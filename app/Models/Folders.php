<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folders extends Model
{
    use HasFactory;

    protected $table = "folders";

    protected $primaryKey = "id_folder";

    protected $keyType = "string";

    protected $fillable = [
        "id_folder",
        "path",
        "author",
        "name",
        "type"
    ];

    public function subFolder()
    {
        return $this->belongsTo(SubFolders::class, "parent_folder");
    }

    public function files()
    {
        return $this->belongsTo(Files::class, "id_folder");
    }
}
