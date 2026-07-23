<?php

namespace App\Services\TaskComment;

use App\Models\Task;
use App\Models\TaskComment;
use Illuminate\Support\Facades\DB;

class TaskCommentService
{
    /*
    |--------------------------------------------------------------------------
    | List Comments
    |--------------------------------------------------------------------------
    */

    public function index(array $filters = [])
    {
        return TaskComment::with([
            'user',
            'task',
            'parent',
            'repliesRecursive.user',
        ])
            ->when(
                !empty($filters['task_id']),
                fn($query) =>
                $query->where(
                    'task_id',
                    $filters['task_id']
                )
            )
            ->when(
                !empty($filters['user_id']),
                fn($query) =>
                $query->where(
                    'user_id',
                    $filters['user_id']
                )
            )
            ->when(
                isset($filters['status']) &&
                    $filters['status'] !== '',
                fn($query) =>
                $query->where(
                    'status',
                    $filters['status']
                )
            )
            /*
            |--------------------------------------------------------------------------
            | Only Root Comments
            |--------------------------------------------------------------------------
            */

            ->whereNull('parent_comment_id')

            /*
            |--------------------------------------------------------------------------
            | Latest First
            |--------------------------------------------------------------------------
            */

            ->latest()

            ->paginate(
                $filters['per_page'] ?? 10
            );
    }

    /*
    |--------------------------------------------------------------------------
    | Store Comment
    |--------------------------------------------------------------------------
    */

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {

            $comment = TaskComment::create([

                'task_id' => $data['task_id'],

                'user_id' => auth()->id(),

                'parent_comment_id' =>
                $data['parent_comment_id'] ?? null,

                'comment' => $data['comment'],

                'mentions' =>
                $data['mentions'] ?? null,

                'is_pinned' =>
                $data['is_pinned'] ?? false,

                'metadata' =>
                $data['metadata'] ?? null,

                'status' =>
                $data['status'] ?? true,

            ]);

            $this->processMentions($comment);

            // Future:
            // $this->logActivity($comment, 'created');

            /*
            |--------------------------------------------------------------------------
            | Future
            |--------------------------------------------------------------------------
            | Notifications
            | Mentions
            | Email
            | Activity
            |--------------------------------------------------------------------------
            */

            return $comment->load([

                'user',

                'task',

                'parent',

                'repliesRecursive.user',

            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Show Comment
    |--------------------------------------------------------------------------
    */

    public function show(TaskComment $comment)
    {
        return $comment->load([

            'user',

            'task',

            'parent',

            'repliesRecursive.user',

        ]);
    }
    /*
|--------------------------------------------------------------------------
| Update Comment
|--------------------------------------------------------------------------
*/

    public function update(TaskComment $comment, array $data)
    {
        return DB::transaction(function () use ($comment, $data) {

            $oldComment = $comment->comment;

            $comment->update([

                'comment' => $data['comment'],

                'mentions' => $data['mentions'] ?? $comment->mentions,

                'metadata' => $data['metadata'] ?? $comment->metadata,

                'is_pinned' => $data['is_pinned'] ?? $comment->is_pinned,

                'status' => $data['status'] ?? $comment->status,

                'is_edited' => true,

                'edited_at' => now(),

            ]);

            $this->processMentions($comment);

            /*
        |--------------------------------------------------------------------------
        | Future Activity Log
        |--------------------------------------------------------------------------
        */

            // $this->logActivity(
            //     $comment,
            //     'updated',
            //     'comment',
            //     $oldComment,
            //     $comment->comment
            // );

            return $comment->fresh()->load([

                'user',

                'task',

                'parent',

                'repliesRecursive.user',

            ]);
        });
    }

    /*
|--------------------------------------------------------------------------
| Soft Delete
|--------------------------------------------------------------------------
*/

    public function destroy(TaskComment $comment)
    {
        return DB::transaction(function () use ($comment) {

            /*
        |--------------------------------------------------------------------------
        | Future Activity Log
        |--------------------------------------------------------------------------
        */

            // $this->logActivity(
            //     $comment,
            //     'deleted'
            // );

            $comment->delete();

            return true;
        });
    }

    /*
|--------------------------------------------------------------------------
| Restore Comment
|--------------------------------------------------------------------------
*/

    public function restore(int $id)
    {
        return DB::transaction(function () use ($id) {

            $comment = TaskComment::onlyTrashed()
                ->findOrFail($id);

            $comment->restore();

            /*
        |--------------------------------------------------------------------------
        | Future Activity Log
        |--------------------------------------------------------------------------
        */

            // $this->logActivity(
            //     $comment,
            //     'restored'
            // );

            return $comment->fresh()->load([

                'user',

                'task',

                'parent',

                'repliesRecursive.user',

            ]);
        });
    }

    /*
|--------------------------------------------------------------------------
| Permanently Delete
|--------------------------------------------------------------------------
*/

    public function forceDelete(int $id)
    {
        return DB::transaction(function () use ($id) {

            $comment = TaskComment::onlyTrashed()
                ->findOrFail($id);

            /*
        |--------------------------------------------------------------------------
        | Future Cleanup
        |--------------------------------------------------------------------------
        */

            // Delete reactions
            // Delete attachments
            // Delete notifications

            $comment->forceDelete();

            return true;
        });
    }
    /*
|--------------------------------------------------------------------------
| Change Active / Inactive Status
|--------------------------------------------------------------------------
*/

    public function changeStatus(TaskComment $comment)
    {
        return DB::transaction(function () use ($comment) {

            $comment->status = ! $comment->status;

            $comment->save();

            // Future:
            // $this->logActivity($comment, 'status_changed');

            return $comment->fresh()->load([

                'user',

                'task',

                'parent',

                'repliesRecursive.user',

            ]);
        });
    }

    /*
|--------------------------------------------------------------------------
| Pin / Unpin Comment
|--------------------------------------------------------------------------
*/

    public function togglePin(TaskComment $comment)
    {
        return DB::transaction(function () use ($comment) {

            $comment->is_pinned = ! $comment->is_pinned;

            $comment->save();

            // Future:
            // $this->logActivity(
            //     $comment,
            //     $comment->is_pinned ? 'pinned' : 'unpinned'
            // );

            return $comment->fresh()->load([

                'user',

                'task',

                'parent',

                'repliesRecursive.user',

            ]);
        });
    }

    /*
|--------------------------------------------------------------------------
| Process Mentions
|--------------------------------------------------------------------------
|
| Future:
| - Notifications
| - Emails
| - Push Notifications
| - WebSocket Events
|--------------------------------------------------------------------------
*/

    private function processMentions(TaskComment $comment): void
    {
        if (empty($comment->mentions)) {
            return;
        }

        foreach ($comment->mentions as $userId) {

            /*
        |--------------------------------------------------------------------------
        | Future
        |--------------------------------------------------------------------------
        */

            // Notification::send(...)

            // Mail::to(...)

            // broadcast(...)

        }
    }

    /*
|--------------------------------------------------------------------------
| Activity Log
|--------------------------------------------------------------------------
|
| Placeholder for future Task Activity integration.
|--------------------------------------------------------------------------
*/

    private function logActivity(
        TaskComment $comment,
        string $action,
        ?string $field = null,
        $oldValue = null,
        $newValue = null,
        ?array $metadata = null
    ): void {

        /*
    |--------------------------------------------------------------------------
    | Example
    |--------------------------------------------------------------------------
    */

        // TaskActivity::create([
        //
        //     'task_id' => $comment->task_id,
        //
        //     'user_id' => auth()->id(),
        //
        //     'action' => $action,
        //
        //     'field_name' => $field,
        //
        //     'old_value' => $oldValue,
        //
        //     'new_value' => $newValue,
        //
        //     'metadata' => $metadata,
        //
        // ]);

    }
}
