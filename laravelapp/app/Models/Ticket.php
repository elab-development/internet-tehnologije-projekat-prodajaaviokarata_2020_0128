<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'reservation_id', 'flight_id', 'seat_number', 'price'
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }
}
