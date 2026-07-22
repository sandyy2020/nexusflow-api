<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => TaskResource::collection($this->collection),
        ];
    }
    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Tasks retrieved successfully.',
        ];
    }
}