<?php

namespace Database\Factories;

use App\Models\Flight;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'reservation_id' => Reservation::factory(),
            'seat_number' => $this->faker->unique()->randomNumber(),
            'price' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}
