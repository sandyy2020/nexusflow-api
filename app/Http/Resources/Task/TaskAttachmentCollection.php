<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskAttachmentCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [

            'data' => TaskAttachmentResource::collection(
                $this->collection
            ),

        ];
    }
}