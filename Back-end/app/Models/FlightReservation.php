<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightReservation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'flight_reservations';

    protected $fillable = [
        'user_id',
        'trip_id',
        'to_airport',
        'credit_card_number',
        'name_on_card',
        'paid_amount',
        'date',
        'number_of_tickets',
        'ticket_price',
        'cvv'
    ];

    public function airport()
    {
        return $this->belongsTo(Airport::class, 'id_to_airport');
    }

    public function tripday()
    {
        return $this->hasMany(TripDay::class, 'flight', 'to_airport');
    }
}