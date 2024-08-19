<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasFactory;
    use HasApiTokens;

    public $timestamps = false;

    protected $table = 'user';
    protected $fillable = ['name', 'image_reference', 'email', 'password', 'age', 'gender', 'country'];

    public function trips()
    {
        return $this->hasMany(Trip::class, 'user_id', 'id');
    }
    public function ratings()
    {
        return $this->hasMany(Rating::class, 'user_id', 'id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country', 'country_name');
    }
}