<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'members';

    protected $guarded = ['id_member'];

    protected $primaryKey = 'id_member';

    protected $keyType = 'string';

    protected $fillable = [
        'id_member',
        'email',
        'name',
        'username',
        'password',
    ];

    public function pinjaman()
    {
        return $this->hasMany(Pinjaman::class, 'id_member');
    }

    public function bayar()
    {
        return $this->hasMany(BayarPinjaman::class, 'id_bayar_pinjaman');
    }
    public function simpananPokok()
    {
        return $this->hasMany(SimpananPokok::class, 'id_member');
    }

    public function simpananWajib()
    {
        return $this->hasMany(SimpananWajib::class, 'id_member');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ['password'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];
}
