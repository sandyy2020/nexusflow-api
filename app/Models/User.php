<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'status',
        'department_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'status' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class);
    }

    public function leadingTeams()
    {
        return $this->hasMany(Team::class, 'team_lead_id');
    }

    public function managedProjects()
    {
        return $this->hasMany(Project::class, 'project_manager_id');
    }

    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function taskAssignments()
    {
        return $this->hasMany(TaskAssignment::class);
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
