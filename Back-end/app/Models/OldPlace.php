<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OldPlace extends Model
{
    use HasFactory;

    protected $table = 'oldplace';
    protected $fillable = ['name', 'location', 'address', 'city_id', 'description', 'time', 'price'];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

}