<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProjectCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => ProjectResource::collection($this->collection),
        ];
    }

    public function with(Request $request): array
    {
        return [
            'status' => true,
            'message' => 'Projects fetched successfully.',
        ];
    }
}
