<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskPriority extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level',
        'color',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}