<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ApiResponse
{
    public static function success(
        mixed $data = null,
        string $message = 'Success',
        int $statusCode = 200
    ): JsonResponse|JsonResource|ResourceCollection {

        if ($data instanceof JsonResource) {

            return $data->additional([
                'status' => true,
                'message' => $message,
            ])->response()->setStatusCode($statusCode);
        }
        if ($data instanceof ResourceCollection) {

            return $data->additional([
                'status' => true,
                'message' => $message,
            ])->response()->setStatusCode($statusCode);
        }

        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public static function error(
        string $message = 'Something went wrong.',
        mixed $errors = null,
        int $statusCode = 400
    ): JsonResponse {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
}
