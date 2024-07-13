<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;
    protected $fillable = [
        'flight_number', 'departure_city', 'arrival_city', 'departure_time', 'arrival_time', 'price', 'total_seats', 'reserved_seats', 'version'
    ];
    

    /*Ova metoda se koristi za implementaciju optimističkog zaključavanja prilikom ažuriranja modela Flight. 
    Optimističko zaključavanje je tehnika koja se koristi da se izbegnu kolizije prilikom konkurentnih ažuriranja resursa, 
    bez eksplicitnog zaključavanja. */
    
    protected function performUpdate(\Illuminate\Database\Eloquent\Builder $query)
    {
        $query->where('version', $this->version);
        $this->version++;
        return parent::performUpdate($query);
    }
    

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
