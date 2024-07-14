<?php

namespace Database\Seeders;

use App\Models\Flight;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Seat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $flights = Flight::all();
        $users = User::all();
        $seats = Seat::all();


        foreach ($flights as $flight) {
            $seats1 = Seat::where('flight_id', $flight->id)->get();
            
            for($i=0;$i<=rand(5,15);$i++)
            {

                Reservation::factory()->create([
                    'flight_id' => $flight->id,
                    'user_id' => $users->random()->id,
                    'seat_id' => $seats1->random()->id,
                ]);
            }
          
        }
    }
}
