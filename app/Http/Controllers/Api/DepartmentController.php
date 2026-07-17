<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Department\StoreDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use App\Services\Department\DepartmentService;
use Exception;

class DepartmentController extends Controller
{
    protected DepartmentService $departmentService;

    public function __construct(
        DepartmentService $departmentService
    ) {
        $this->departmentService = $departmentService;
    }

    public function index()
    {
        try {

            $departments = $this->departmentService->index(request()->all());

            return ApiResponse::success(
                DepartmentResource::collection($departments),
                'Departments fetched successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }

    public function store(StoreDepartmentRequest $request)
    {
        try {

            $department = $this->departmentService->store(
                $request->validated()
            );

            return ApiResponse::success(
                new DepartmentResource($department),
                'Department created successfully.',
                201
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }

    public function show(Department $department)
    {
        try {

            return ApiResponse::success(
                new DepartmentResource(
                    $this->departmentService->show($department)
                ),
                'Department fetched successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }

    public function update(
        UpdateDepartmentRequest $request,
        Department $department
    ) {
        try {

            $department = $this->departmentService->update(
                $department,
                $request->validated()
            );

            return ApiResponse::success(
                new DepartmentResource($department),
                'Department updated successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }

    /**
     * Delete Department
     */
    public function destroy(Department $department)
    {
        try {

            $this->departmentService->destroy($department);

            return ApiResponse::success(
                null,
                'Department deleted successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }

    /**
     * Change Status
     */
    public function changeStatus(Department $department)
    {
        try {

            $department = $this->departmentService->changeStatus($department);

            return ApiResponse::success(
                new DepartmentResource($department),
                'Department status updated successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }
}
