<?php

namespace App\Services\TaskAttachment;

use App\Models\TaskAttachment;
use App\Services\File\FileUploadService;
use Illuminate\Support\Facades\DB;

class TaskAttachmentService
{
    /**
     * File Upload Service
     */
    protected FileUploadService $fileUploadService;

    /**
     * Constructor
     */
    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /*
    |--------------------------------------------------------------------------
    | Get All Attachments
    |--------------------------------------------------------------------------
    */

    public function index(array $filters = [])
    {
        return TaskAttachment::with([
            'task',
            'uploader',
        ])
            ->when(
                !empty($filters['search']),
                function ($query) use ($filters) {

                    $query->where(function ($q) use ($filters) {

                        $q->where(
                            'file_name',
                            'like',
                            "%{$filters['search']}%"
                        )
                            ->orWhere(
                                'mime_type',
                                'like',
                                "%{$filters['search']}%"
                            );
                    });
                }
            )
            ->when(
                !empty($filters['task_id']),
                function ($query) use ($filters) {

                    $query->where(
                        'task_id',
                        $filters['task_id']
                    );
                }
            )
            ->when(
                isset($filters['status']) &&
                    $filters['status'] !== '',
                function ($query) use ($filters) {

                    $query->where(
                        'status',
                        $filters['status']
                    );
                }
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    /*
    |--------------------------------------------------------------------------
    | Store Attachment
    |--------------------------------------------------------------------------
    */

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {

            $fileData = $this->fileUploadService->upload(

                $data['file'],

                'tasks/attachments'

            );

            $attachment = TaskAttachment::create([

                'task_id' => $data['task_id'],

                'uploaded_by' => auth()->id(),

                'status' => $data['status'] ?? true,

                ...$fileData,

            ]);

            return $attachment->load([

                'task',

                'uploader',

            ]);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Show Attachment
    |--------------------------------------------------------------------------
    */

    public function show(TaskAttachment $attachment)
    {
        return $attachment->load([

            'task',

            'uploader',

        ]);
    }

    public function update(
        TaskAttachment $attachment,
        array $data
    ) {
        return DB::transaction(function () use (
            $attachment,
            $data
        ) {

            if (!empty($data['file'])) {

                $fileData = $this->fileUploadService->replace(

                    $attachment->file_path,

                    $data['file'],

                    'tasks/attachments'

                );

                $attachment->fill($fileData);
            }

            if (
                array_key_exists(
                    'status',
                    $data
                )
            ) {

                $attachment->status = $data['status'];
            }

            $attachment->save();

            return $attachment
                ->fresh()
                ->load([

                    'task',

                    'uploader',

                ]);
        });
    }

    public function destroy(TaskAttachment $attachment)
    {
        return DB::transaction(function () use ($attachment) {

            $attachment->delete();

            return true;
        });
    }

    public function restore(int $id)
    {
        return DB::transaction(function () use ($id) {

            $attachment = TaskAttachment::onlyTrashed()
                ->findOrFail($id);

            $attachment->restore();

            return $attachment
                ->fresh()
                ->load([
                    'task',
                    'uploader',
                ]);
        });
    }

    public function forceDelete(int $id)
    {
        return DB::transaction(function () use ($id) {

            $attachment = TaskAttachment::onlyTrashed()
                ->findOrFail($id);

            $this->fileUploadService->delete(
                $attachment->file_path
            );

         

            $attachment->forceDelete();

            return true;
        });
    }

    public function changeStatus(TaskAttachment $attachment)
    {
        $attachment->status = ! $attachment->status;

        $attachment->save();

        return $attachment
            ->fresh()
            ->load([
                'task',
                'uploader',
            ]);
    }
}
