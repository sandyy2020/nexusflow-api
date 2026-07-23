<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskCommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'task_id' => $this->task_id,
            'parent_comment_id' => $this->parent_comment_id,
            'comment' => $this->comment,
            'mentions' => $this->mentions,
            'is_edited' => $this->is_edited,
            'edited_at' => $this->edited_at,
            'is_pinned' => $this->is_pinned,
            'metadata' => $this->metadata,
            'status' => $this->status,
            'task' => new TaskResource(
                $this->whenLoaded('task')
            ),
            'user' => new UserResource(
                $this->whenLoaded('user')
            ),
            'parent' => new TaskCommentResource(
                $this->whenLoaded('parent')
            ),
            'replies' => TaskCommentResource::collection(
                $this->whenLoaded('repliesRecursive')
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,

        ];
    }
}
