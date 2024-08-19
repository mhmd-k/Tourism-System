<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resturant extends Model
{
    use HasFactory;

    protected $table = 'resturant';
    protected $fillable = ['name', 'location', 'address', 'city_id', 'description', 'stars', 'food_type', 'price'];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }
}
