<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    use HasFactory;

    protected $table = 'airport';
    protected $fillable = ['name', 'address', 'city_id', 'location'];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }
}