<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@nexusflow.com'],
            [
                'name' => 'Super Admin',
                'password' => 'password123',
                'status' => true,
            ]
        );

        $user->assignRole('Super Admin');
    }
}
