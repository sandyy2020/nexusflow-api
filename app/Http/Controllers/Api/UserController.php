<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateStatusRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\User\UserService;
use Exception;
use Illuminate\Http\Request;
use App\Models\Department;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        try {

            $users = $this->userService->index();

            return ApiResponse::success(
                UserResource::collection($users),
                'Users retrieved successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function store(StoreUserRequest $request)
    {
        try {

            $user = $this->userService->store(
                $request->validated()
            );

            return ApiResponse::success(
                new UserResource($user),
                'User created successfully.',
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

    public function show(User $user)
    {
        try {

            $user = $this->userService->show($user);

            return ApiResponse::success(
                new UserResource($user),
                'User fetched successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {

            $user = $this->userService->update(
                $user,
                $request->validated()
            );

            return ApiResponse::success(
                new UserResource($user),
                'User updated successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function destroy(User $user)
    {
        try {

            $this->userService->destroy($user);

            return ApiResponse::success(
                null,
                'User deleted successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function changeStatus(UpdateStatusRequest $request, User $user)
    {
        try {

            $user = $this->userService->changeStatus(
                $user,
                $request->validated()['status']
            );

            return ApiResponse::success(
                new UserResource($user),
                'User status updated successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function assignRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);

        try {

            $user = $this->userService->assignRole(
                $user,
                $request->role
            );

            return ApiResponse::success(
                new UserResource($user),
                'Role assigned successfully.'
            );
        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function usersByDepartment($departmentId)
    {
        $users = User::where('department_id', $departmentId)
            ->where('status', true)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return ApiResponse::success(
            $users,
            'Department users fetched successfully.'
        );
    }

    public function usersByTeam($teamId)
    {
        $users = User::where('team_id', $teamId)
            ->where('status', true)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();


        return ApiResponse::success(
            $users,
            'Team users fetched successfully.'
        );
    }
}
