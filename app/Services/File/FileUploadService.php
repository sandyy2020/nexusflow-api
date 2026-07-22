<?php

namespace App\Services\File;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function upload(
        UploadedFile $file,
        string $directory = 'uploads',
        string $disk = 'public'
    ): array {

        $path = $file->store($directory, $disk);

        return [

            'file_name' => $file->getClientOriginalName(),

            'file_path' => $path,

            'mime_type' => $file->getMimeType(),

            'file_size' => $file->getSize(),

        ];
    }

    public function replace(
        ?string $oldFile,
        UploadedFile $newFile,
        string $directory = 'uploads',
        string $disk = 'public'
    ): array {

        if (
            $oldFile &&
            Storage::disk($disk)->exists($oldFile)
        ) {
            Storage::disk($disk)->delete($oldFile);
        }

        return $this->upload(
            $newFile,
            $directory,
            $disk
        );
    }

    public function delete(
        ?string $file,
        string $disk = 'public'
    ): bool {

        if (
            $file &&
            Storage::disk($disk)->exists($file)
        ) {
            Storage::disk($disk)->delete($file);
        }

        return true;
    }

    public function exists(
        ?string $file,
        string $disk = 'public'
    ): bool {

        return $file
            ? Storage::disk($disk)->exists($file)
            : false;
    }

    public function url(
        ?string $file,
        string $disk = 'public'
    ): ?string {

        if (!$file) {
            return null;
        }

        return Storage::disk($disk)->url($file);
    }
}
