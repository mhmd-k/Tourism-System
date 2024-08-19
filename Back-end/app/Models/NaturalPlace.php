<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NaturalPlace extends Model
{
    use HasFactory;

    protected $table = 'naturalplace';
    protected $fillable = ['name', 'location', 'address', 'city_id', 'description', 'time'];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

}
