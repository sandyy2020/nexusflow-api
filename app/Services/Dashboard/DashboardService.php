<?php

namespace App\Services\Dashboard;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Department;
use Illuminate\Support\Facades\DB;
use App\Models\Project;
use App\Models\Team;
use App\Models\Task;
use App\Models\TaskComment;
use App\Models\TaskAttachment;
use App\Models\TaskStatus;
use App\Models\TaskPriority;

class DashboardService
{
    public function getDashboardData(): array
    {
        return [

            // 'summary' => [
            //     'users' => User::count(),
            //     'active_users' => User::where('status', 1)->count(),
            //     'inactive_users' => User::where('status', 0)->count(),
            //     'roles' => Role::count(),
            //     'permissions' => Permission::count(),
            //     'departments' => Department::count(),
            //     'active_departments' => Department::where('status', true)->count(),
            //     'inactive_departments' => Department::where('status', false)->count(),
            //     'new_users_month' => User::whereYear('created_at', now()->year)
            //         ->whereMonth('created_at', now()->month)
            //         ->count(),
            // ],
            'summary' => [

                // Users
                'users' => User::count(),
                'active_users' => User::where('status', true)->count(),
                'inactive_users' => User::where('status', false)->count(),

                // Roles & Permissions
                'roles' => Role::count(),
                'permissions' => Permission::count(),

                // Departments
                'departments' => Department::count(),
                'active_departments' => Department::where('status', true)->count(),
                'inactive_departments' => Department::where('status', false)->count(),

                // Teams
                'teams' => Team::count(),
                'active_teams' => Team::where('status', true)->count(),

                // Projects
                'projects' => Project::count(),
                'active_projects' => Project::where('status', true)->count(),
                'inactive_projects' => Project::where('status', false)->count(),

                // Tasks
                'tasks' => Task::count(),
                'active_tasks' => Task::where('status', true)->count(),
                'completed_tasks' => Task::whereNotNull('completed_at')->count(),
                'pending_tasks' => Task::whereNull('completed_at')->count(),

                // Attachments
                'task_attachments' => TaskAttachment::count(),

                // Comments
                'task_comments' => TaskComment::count(),

                // Task Statuses
                'task_statuses' => TaskStatus::count(),

                // Task Priorities
                'task_priorities' => TaskPriority::count(),

                // New Users This Month
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

            'recent_projects' => Project::latest()
                ->take(5)
                ->get(),

            'recent_tasks' => Task::with([
                'project',
                'status',
                'priority'
            ])
                ->latest()
                ->take(5)
                ->get(),

            'recent_comments' => TaskComment::with([
                'task',
                'user'
            ])
                ->latest()
                ->take(5)
                ->get(),

            'recent_attachments' => TaskAttachment::with([
                'task',
                'user'
            ])
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
            'project_stats' => [
                'active' => Project::where('status', true)->count(),
                'inactive' => Project::where('status', false)->count(),
            ],
            'task_stats' => [
                'completed' => Task::whereNotNull('completed_at')->count(),
                'pending' => Task::whereNull('completed_at')->count(),
            ],
            'task_status_chart' => TaskStatus::withCount('tasks')
                ->orderBy('sort_order')
                ->get(),
            'task_priority_chart' => TaskPriority::withCount('tasks')
                ->orderBy('level')
                ->get(),
            'monthly_tasks' => Task::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                ->whereYear('created_at', now()->year)
                ->groupBy('date')
                ->orderBy('date')
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
