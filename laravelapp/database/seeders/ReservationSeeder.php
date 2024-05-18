<?php

namespace Database\Seeders;

use App\Models\Flight;
use App\Models\Reservation;
use App\Models\User;
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

        foreach ($flights as $flight) {
            // Kreiramo između 5 i 15 rezervacija po letu
            Reservation::factory(rand(5, 15))->create([
                'flight_id' => $flight->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
