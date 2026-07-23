<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'summary' => $this['summary'],
            'recent_users' => $this['recent_users'],
            'recent_roles' => $this['recent_roles'],
            'latest_users' => $this['latest_users'] ?? [],

            'recent_projects' => $this['recent_projects'],
            'recent_tasks' => $this['recent_tasks'],
            'recent_comments' => $this['recent_comments'],
            'recent_attachments' => $this['recent_attachments'],

            'department_stats' => $this['department_stats'] ?? [],
            'role_stats' => $this['role_stats'] ?? [],
            'project_stats' => $this['project_stats'],
            'task_stats' => $this['task_stats'],

            'task_status_chart' => $this['task_status_chart'],
            'task_priority_chart' => $this['task_priority_chart'],
            'monthly_tasks' => $this['monthly_tasks'],

            'growth_stats' => $this['growth_stats'],
            'recent_activity' => $this['recent_activity'],
        ];
    }
}
