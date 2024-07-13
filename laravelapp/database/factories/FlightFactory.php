<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'flight_number' => $this->faker->unique()->regexify('[A-Z]{3}[0-9]{4}'),
            'departure_city' => $this->faker->city(),
            'arrival_city' => $this->faker->city(),
            'departure_time' => Carbon::now()->addDays($this->faker->numberBetween(1, 30)),
            'arrival_time' => Carbon::now()->addDays($this->faker->numberBetween(1, 30))->addHours($this->faker->numberBetween(1, 10)),
            'price' => $this->faker->randomFloat(2, 50, 500),
            'total_seats' => $this->faker->numberBetween(50, 200),
            'reserved_seats' => $this->faker->numberBetween(0, 50),
        ];
    }
}
