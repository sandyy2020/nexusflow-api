<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Success Response
     */
    public static function success(
        string $message = 'Success',
        mixed $data = null,
        int $statusCode = 200
    ) {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * Error Response
     */
    public static function error(
        string $message = 'Something went wrong.',
        mixed $errors = null,
        int $statusCode = 400
    ) {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
}