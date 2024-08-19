<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $table = 'hotel';
    protected $fillable = ['name', 'location', 'address', 'city_id', 'price', 'stars'];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function reservations()
    {
        return $this->hasMany(HotelReservation::class, 'hotel_id');
    }
}
