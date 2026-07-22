<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskComment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'task_id',
        'user_id',
        'parent_comment_id',
        'comment',
        'mentions',
        'is_edited',
        'edited_at',
        'is_pinned',
        'metadata',
        'status',
    ];

    protected $casts = [
        'mentions' => 'array',
        'metadata' => 'array',
        'is_edited' => 'boolean',
        'is_pinned' => 'boolean',
        'status' => 'boolean',
        'edited_at' => 'datetime',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(
            TaskComment::class,
            'parent_comment_id'
        );
    }

    public function replies()
    {
        return $this->hasMany(
            TaskComment::class,
            'parent_comment_id'
        );
    }

    public function repliesRecursive()
    {
        return $this->replies()
            ->with([
                'user',
                'repliesRecursive'
            ]);
    }

    public function latestReplies()
    {
        return $this->replies()
            ->latest();
    }

    public function activeReplies()
    {
        return $this->replies()
            ->where('status', true);
    }
}
