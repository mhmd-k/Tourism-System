<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $table = 'country';
    protected $primaryKey = 'country_name'; // Specify that the primary key is 'country_name'
    public $incrementing = false; // Specify that the primary key is not an incrementing integer
    protected $keyType = 'string'; // Specify that the primary key is a string
    protected $fillable = ['country_code'];

    public function cities()
    {
        return $this->hasMany(City::class, 'country', 'country_name');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'country', 'country_name');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'country', 'country_name');
    }
}