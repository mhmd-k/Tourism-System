<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DayPlace extends Model
{
    use HasFactory;

    protected $table = 'dayplaces';
    protected $fillable = ['day_id', 'place_id', 'place_type', 'index', 'transport_method', 'money_amount', 'pre_distance'];

    public function tripDay()
    {
        return $this->belongsTo(TripDay::class, 'day_id', 'id');
    }
}
