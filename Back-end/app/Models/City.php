<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'city';
    protected $primaryKey = 'city_id';
    protected $fillable = ['name', 'latitude', 'longitude', 'country', 'capital'];

    public function country()
    {
        return $this->belongsTo(Country::class, 'country', 'country_name');
    }

    public function airports()
    {
        return $this->hasMany(Airport::class, 'city_id', 'city_id');
    }

    public function hotels()
    {
        return $this->hasMany(Hotel::class, 'city_id', 'city_id');
    }
}