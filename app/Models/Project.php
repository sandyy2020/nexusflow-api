<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'team_id',
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
        'is_active',
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

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function projectManager()
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }
}
