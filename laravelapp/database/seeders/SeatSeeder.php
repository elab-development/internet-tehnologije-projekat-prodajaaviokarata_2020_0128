<?php

namespace Database\Seeders;

use App\Models\Flight;
use App\Models\Seat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $flights = Flight::all();

        foreach ($flights as $flight) {
            
            Seat::factory($flight->total_seats)->create([
                'flight_id' => $flight->id,
            ]);
        }
    }
}
