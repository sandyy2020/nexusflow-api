<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskAttachment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'task_id',
        'uploaded_by',
        'file_name',
        'original_name',
        'file_path',
        'disk',
        'mime_type',
        'file_size',
        'metadata',
        'status',
    ];

    protected $casts = [
        'metadata' => 'array',
        'status' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}