<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Ticket;
use App\Models\Flight;
use App\Models\Seat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reservations = Reservation::all();

        foreach ($reservations as $reservation) {
            $flight = Flight::findOrFail($reservation->flight_id);
            $seats = Seat::where('flight_id', $flight->id)->get();
        
            for($i=0;$i<=rand(1,3);$i++)
            {

                Ticket::factory()->create([
                        'reservation_id' => $reservation->id,
                        'seat_number' => $seats->random()->seat_number,
                        'price'=> $reservation->flight->price,
                     ]);
               
            }
            
        }
    }
}
