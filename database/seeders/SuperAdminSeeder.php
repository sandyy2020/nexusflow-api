<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class SuperAdminSeeder extends Seeder
{
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

        $role = Role::findByName('Super Admin', 'web');
        $role->syncPermissions(Permission::all());
        if (! $user->hasRole('Super Admin')) {
            $user->assignRole($role);
        }
    }
}
