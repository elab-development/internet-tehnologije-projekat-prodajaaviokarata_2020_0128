<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;
    protected $fillable = [
        'flight_number', 'departure_city', 'arrival_city', 'departure_time', 'arrival_time', 'price', 'total_seats', 'reserved_seats'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
