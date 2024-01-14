<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prize>
 */
class PrizeFactory extends Factory
{

    private static $increment = 1;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'game_id' => 1,
            'prize_number' => self::$increment,
            'name' => '景品' . self::$increment++,
            'winner' => fake()->name(),
            'other' => NULL,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
