<?php

namespace App\Http\Controllers\API\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthService;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register
     */
    public function register(RegisterRequest $request)
    {
        try {

            $result = $this->authService->register($request->validated());

            return ApiResponse::success(
                [
                    'user' => new UserResource($result['user']),
                    'token' => $result['token'],
                ],
                'Registration successful.',
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

    /**
     * Login
     */
    public function login(LoginRequest $request)
    {
        try {

            $result = $this->authService->login($request->validated());

            return ApiResponse::success(
                [
                    'user' => new UserResource($result['user']),
                    'token' => $result['token'],
                ],
                'Login successful.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                401
            );
        }
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $this->authService->logout($request);

        return ApiResponse::success(
            null,
            'Logout successful.'
        );
    }

    /**
     * Authenticated User
     */
    public function me(Request $request)
    {
        return ApiResponse::success(
            new UserResource(
                $this->authService->me($request)
            ),
            'Authenticated user.'
        );
    }
}