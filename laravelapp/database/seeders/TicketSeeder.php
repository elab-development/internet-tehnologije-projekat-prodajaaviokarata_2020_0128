<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Ticket;
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
            // Kreiramo između 1 i 3 karte po rezervaciji
            Ticket::factory(rand(1, 3))->create([
                'reservation_id' => $reservation->id,
                'flight_id' => $reservation->flight_id,
            ]);
        }
    }
}
