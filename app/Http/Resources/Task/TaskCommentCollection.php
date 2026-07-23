<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskCommentCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => TaskCommentResource::collection(
                $this->collection
            ),
        ];
    }

    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Task comments retrieved successfully.',
        ];
    }
}