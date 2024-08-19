<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $table = 'trip';
    protected $fillable = [
        'user_id',
        'country',
        'from_city',
        'number_of_people',
        'number_of_days',
        'budget',
        'transportation',
        'trip_cost'
    ];


    public function country()
    {
        return $this->belongsTo(Country::class, 'country', 'country_name');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function tripDays()
    {
        return $this->hasMany(TripDay::class, 'trip_id', 'id');
    }

    public function hotelsReservations()
    {
        return $this->hasMany(HotelReservation::class, 'trip_id', 'id');
    }
}
