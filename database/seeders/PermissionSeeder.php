<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Role
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',

            // Dashboard
            'view dashboard',

            // Permission
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',

            // Department
            'view departments',
            'create departments',
            'edit departments',
            'delete departments',

            // Designation
            'view designations',
            'create designations',
            'edit designations',
            'delete designations',

            // Team
            'view teams',
            'create teams',
            'edit teams',
            'delete teams',

            // Project
            'view projects',
            'create projects',
            'edit projects',
            'delete projects',

            //Task Attachments
            'view task attachments',
            'create task attachments',
            'edit task attachments',
            'delete task attachments',
            'restore task attachments',
            'force delete task attachments',

            //Task Comments
            'view task comments',
            'create task comments',
            'edit task comments',
            'delete task comments',
            'restore task comments',
            'force delete task comments',
            'pin task comments',

            // Task Priorities
            'view task priorities',
            'create task priorities',
            'edit task priorities',
            'delete task priorities',

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}
