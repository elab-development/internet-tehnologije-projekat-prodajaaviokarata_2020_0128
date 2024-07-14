<?php

namespace Database\Factories;

use App\Models\Flight;
use App\Models\User;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'flight_id' => Flight::factory(),
            'status' => $this->faker->randomElement(['confirmed', 'pending', 'cancelled']),
            'seat_id' => Seat::factory(),
        ];
    }
}
