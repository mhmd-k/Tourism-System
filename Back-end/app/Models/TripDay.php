<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripDay extends Model
{
    use HasFactory;

    protected $table = 'tripday';
    protected $fillable = [
        'trip_id',
        'city_id',
        'date',
        'hotel_id',
        'transportation_method',
        'flight',
        'day_cost'
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id', 'id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id', 'id');
    }

    public function flightreservation()
    {
        return $this->belongsTo(FlightReservation::class, 'flight', 'id');
    }

    public function dayPlaces()
    {
        return $this->hasMany(DayPlace::class, 'day_id', 'id');
    }
}
