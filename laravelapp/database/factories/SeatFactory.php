<?php

namespace Database\Factories;

use App\Models\Flight;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'flight_id' => Flight::factory(),
            'seat_number' => $this->faker->unique()->randomNumber(),
            'description' => $this->faker->sentence(),
            'is_locked' => $this->faker->boolean(),
            'locked_at' => $this->faker->boolean() ? Carbon::now() : null,
        ];
    }
}
