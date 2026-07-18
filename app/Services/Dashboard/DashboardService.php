<?php

namespace App\Services\Dashboard;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Department;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getDashboardData(): array
    {
        return [

            'summary' => [
                'users' => User::count(),
                'active_users' => User::where('status', 1)->count(),
                'inactive_users' => User::where('status', 0)->count(),
                'roles' => Role::count(),
                'permissions' => Permission::count(),
                'departments' => Department::count(),
                'active_departments' => Department::where('status', true)->count(),
                'inactive_departments' => Department::where('status', false)->count(),
                'new_users_month' => User::whereYear('created_at', now()->year)
                    ->whereMonth('created_at', now()->month)
                    ->count(),
            ],

            'recent_users' => User::latest()
                ->take(5)
                ->get(),

            'recent_roles' => Role::latest()
                ->take(5)
                ->get(),

            'latest_users' => User::with('department')
                ->latest()
                ->take(5)
                ->get(),

            'department_stats' => Department::withCount('users')
                ->orderBy('name')
                ->get(),

            'role_stats' => DB::table('model_has_roles')
                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                ->select(
                    'roles.id',
                    'roles.name',
                    DB::raw('COUNT(*) as total')
                )
                ->groupBy('roles.id', 'roles.name')
                ->orderBy('roles.name')
                ->get(),
            'growth_stats' => User::selectRaw('DATE(created_at) as date,COUNT(*) as total')
                ->whereMonth('created_at', now()->month)
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            'recent_activity' => User::latest()
                ->take(10)
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'icon' => 'user',
                        'message' => "{$user->name} joined the system",
                        'time' => $user->created_at->diffForHumans(),
                    ];
                }),
        ];
    }
}
