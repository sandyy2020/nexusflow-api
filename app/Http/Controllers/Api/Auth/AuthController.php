<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use App\Helpers\ApiResponse;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Exception;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        try {

            $result = $this->authService->register($request->validated());

            return ApiResponse::success(
                'Registration successful.',
                [
                    'user' => new UserResource($result['user']),
                    'token' => $result['token'],
                ],
                201
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }
    public function login(LoginRequest $request)
    {
        try {

            $result = $this->authService->login($request->validated());

            return ApiResponse::success(
                'Login successful.',
                [
                    'user' => new UserResource($result['user']),
                    'token' => $result['token'],
                ]
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                401
            );
        }
    }
    public function logout(Request $request)
    {
        $this->authService->logout($request);

        return ApiResponse::success(
            'Logout successful.'
        );
    }
    public function me(Request $request)
    {
        return ApiResponse::success(
            'Authenticated user.',
            new UserResource(
                $this->authService->me($request)
            )
        );
    }
}
