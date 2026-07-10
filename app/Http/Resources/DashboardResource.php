<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [

            'summary' => $this['summary'],

            'recent_users' => $this['recent_users'],

            'recent_roles' => $this['recent_roles'],

        ];
    }
}
