<?php

namespace App\Services\Dashboard;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Department;

class DashboardService
{
    public function getDashboardData(): array
    {
         return [

            'summary' => [

                'users' => User::count(),

                // Change the column name if your project uses a different one.
                'active_users' => User::where('status', 1)->count(),

                'inactive_users' => User::where('status', 0)->count(),

                'roles' => Role::count(),

                'permissions' => Permission::count(),

                'departments' => Department::count(),

                'active_departments' => Department::where('status', true)->count(),

                'inactive_departments' => Department::where('status', false)->count(),

            ],

            'recent_users' => User::latest()
                ->take(5)
                ->get(),

            'recent_roles' => Role::latest()
                ->take(5)
                ->get(),

        ];
    }
}