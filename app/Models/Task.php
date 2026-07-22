<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'task_code',
        'project_id',
        'parent_task_id',
        'task_status_id',
        'task_priority_id',
        'created_by',
        'updated_by',
        'title',
        'description',
        'progress',
        'story_points',
        'estimated_hours',
        'actual_hours',
        'start_date',
        'due_date',
        'completed_at',
        'is_billable',
        'metadata',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'metadata'        => 'array',
        'status'          => 'boolean',
        'is_billable'     => 'boolean',
        'start_date'      => 'date',
        'due_date'        => 'date',
        'completed_at'    => 'datetime',
        'estimated_hours' => 'decimal:2',
        'actual_hours'    => 'decimal:2',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function status()
    {
        return $this->belongsTo(TaskStatus::class, 'task_status_id');
    }

    public function priority()
    {
        return $this->belongsTo(TaskPriority::class, 'task_priority_id');
    }

    public function parent()
    {
        return $this->belongsTo(Task::class, 'parent_task_id');
    }

    public function children()
    {
        return $this->hasMany(Task::class, 'parent_task_id');
    }

    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function updatedTasks()
    {
        return $this->hasMany(Task::class, 'updated_by');
    }

    public function taskAssignments()
    {
        return $this->hasMany(TaskAssignment::class);
    }

    public function assignedUsers()
    {
        return $this->belongsToMany(
            User::class,
            'task_assignments'
        )->withPivot([
            'role',
            'assigned_by',
            'assigned_at',
            'status'
        ])->withTimestamps();
    }

    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function timeLogs()
    {
        return $this->hasMany(TaskTimeLog::class);
    }

    public function checklists()
    {
        return $this->hasMany(TaskChecklist::class);
    }

    public function activities()
    {
        return $this->hasMany(TaskActivity::class)->latest();
    }

    public function assignedTasks()
    {
        return $this->belongsToMany(
            Task::class,
            'task_assignments'
        )->withPivot([
            'role',
            'assigned_by',
            'assigned_at',
            'status',
        ])->withTimestamps();
    }

    public function uploadedTaskAttachments()
    {
        return $this->hasMany(TaskAttachment::class, 'uploaded_by');
    }

    public function taskComments()
    {
        return $this->hasMany(TaskComment::class);
    }

    public function taskTimeLogs()
    {
        return $this->hasMany(TaskTimeLog::class);
    }

    public function assignedChecklistItems()
    {
        return $this->hasMany(TaskChecklist::class, 'assigned_to');
    }

    public function completedChecklistItems()
    {
        return $this->hasMany(TaskChecklist::class, 'completed_by');
    }

    public function taskActivities()
    {
        return $this->hasMany(TaskActivity::class);
    }
}
