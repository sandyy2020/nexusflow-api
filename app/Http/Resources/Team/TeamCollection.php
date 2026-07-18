<?php

namespace App\Http\Resources\Team;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TeamCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => TeamResource::collection($this->collection),
        ];
    }

    public function with(Request $request): array
    {
        return [
            'status' => true,
            'message' => 'Teams fetched successfully.',
        ];
    }
}
