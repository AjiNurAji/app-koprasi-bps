<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::create([
        //     'username' => 'admin',
        //     'password' => Hash::make('admin'),
        //     'name' => 'admin',
        //     'role' => 'admin',
        // ]);

        // \App\Models\Kas::create([
        //     'name' => 'tunai',
        //     'saldo_awal' => 23612066,
        //     'tahun' => date('Y'),
        // ]);

        // for($i = 1; $i <= 15; $i++) {
        //     \App\Models\Member::create([
        //         'email' => fake()->email(),
        //         'name' => fake()->name(),
        //         'password' => Hash::make('bps3208')
        //     ]);
        // }

        //  \App\Models\User::factory(10)->create();

        //  \App\Models\User::factory()->create([
        //      'name' => 'Test User',
        //      'email' => 'test@example.com',
        // ]);
    }
}
