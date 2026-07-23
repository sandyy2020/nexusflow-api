<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskAssignmentCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [

            'data' => TaskAssignmentResource::collection(
                $this->collection
            ),

        ];
    }
}