<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //5 admina
        User::factory()->count(5)->create([
            'role' => 'admin'
        ]);

        // 45 korisnika sa ulogom user
        User::factory()->count(45)->create([
            'role' => 'user'
        ]);
    }
}
