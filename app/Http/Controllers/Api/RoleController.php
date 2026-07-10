<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Http\Requests\Role\AssignPermissionRequest;
use App\Http\Resources\RoleResource;
use App\Services\Role\RoleService;
use Spatie\Permission\Models\Role;


class RoleController extends Controller
{
    protected RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    /**
     * List Roles
     */
    public function index()
    {
        try {

            $roles = $this->roleService->index();

            return ApiResponse::success(
                RoleResource::collection($roles),
                'Roles retrieved successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to retrieve roles.',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Create Role
     */
    public function store(StoreRoleRequest $request)
    {
        try {

            $role = $this->roleService->store($request->validated());

            return ApiResponse::success(
                new RoleResource($role),
                'Role created successfully.',
                201
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to create role.',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * View Role
     */
    public function show(Role $role)
    {
        try {

            return ApiResponse::success(
                new RoleResource($this->roleService->show($role)),
                'Role retrieved successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to retrieve role.',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Update Role
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {

            $role = $this->roleService->update(
                $role,
                $request->validated()
            );

            return ApiResponse::success(
                new RoleResource($role),
                'Role updated successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to update role.',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Delete Role
     */
    public function destroy(Role $role)
    {
        try {

            $this->roleService->destroy($role);

            return ApiResponse::success(
                null,
                'Role deleted successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * List Permissions
     */
    public function permissions()
    {
        try {

            return ApiResponse::success(
                $this->roleService->permissions(),
                'Permissions retrieved successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to retrieve permissions.',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Assign Permissions
     */
    public function assignPermissions(
        AssignPermissionRequest $request,
        Role $role
    ) {
        try {

            $role = $this->roleService->assignPermissions(
                $role,
                $request->validated()['permissions']
            );

            return ApiResponse::success(
                new RoleResource($role),
                'Permissions assigned successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                'Failed to assign permissions.',
                500,
                $e->getMessage()
            );
        }
    }
}