<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelReservation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'hotel_reservations';

    protected $fillable = [
        'trip_id',
        'hotel_id',
        'credit_card_number',
        'cvv',
        'name_on_card',
        'paid_amount',
        'date',
        'trip_id',
        'user_id',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class, 'id', 'trip_id');
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'id', 'hotel_id');
    }
}