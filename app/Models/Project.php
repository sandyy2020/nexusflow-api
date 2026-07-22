<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'project_manager_id',
        'name',
        'code',
        'client_name',
        'start_date',
        'end_date',
        'priority',
        'project_status',
        'progress',
        'budget',
        'description',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'budget' => 'decimal:2',
        'progress' => 'integer',
        'status' => 'boolean',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'project_team', 'project_id', 'team_id');
    }

    public function projectManager()
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function taskStatuses()
    {
        return $this->hasMany(TaskStatus::class);
    }
}
