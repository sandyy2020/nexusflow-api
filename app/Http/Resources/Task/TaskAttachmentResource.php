<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskAttachmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'task_id' => $this->task_id,

            'uploaded_by' => $this->uploaded_by,

            'file_name' => $this->file_name,

            'file_path' => $this->file_path,

            'file_url' => $this->file_path
                ? Storage::url($this->file_path)
                : null,

            'mime_type' => $this->mime_type,

            'file_size' => $this->file_size,


            'file_size_human' => $this->formatFileSize($this->file_size),

            'status' => $this->status,

            'created_at' => optional($this->created_at)
                ->format('Y-m-d H:i:s'),

            'updated_at' => optional($this->updated_at)
                ->format('Y-m-d H:i:s'),

            'task' => new TaskResource(
                $this->whenLoaded('task')
            ),

            'uploader' => new UserResource(
                $this->whenLoaded('uploader')
            ),

        ];
    }

    private function formatFileSize(?int $bytes): ?string
    {
        if (!$bytes) {
            return null;
        }

        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $power = floor(log($bytes, 1024));

        return number_format(
            $bytes / pow(1024, $power),
            2
        ) . ' ' . $units[$power];
    }
}