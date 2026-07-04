<?php

namespace App\Services\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function register(array $data): array
    {
        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'phone'    => $data['phone'] ?? null,
                'password' => $data['password'],
                'status'   => true,
            ]);

            $user->assignRole('Employee');

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user'  => $user,
                'token' => $token,
            ];
        });
    }

    public function login(array $data): array
    {
        if (!Auth::attempt([
            'email' => $data['email'],
            'password' => $data['password'],
        ])) {
            throw new \Exception('Invalid credentials.');
        }

        $user = Auth::user();

        if (!$user->status) {
            throw new \Exception('Your account is inactive.');
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }
    public function logout(Request $request): void
    {
        $request->user()->currentAccessToken()->delete();
    }
    public function me(Request $request): ?User
    {
         return $request->user();
    }
}
