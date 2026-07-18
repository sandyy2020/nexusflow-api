<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Designation\StoreDesignationRequest;
use App\Http\Requests\Designation\UpdateDesignationRequest;
use App\Http\Resources\DesignationResource;
use App\Services\Designation\DesignationService;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;

class DesignationController extends Controller
{
    protected DesignationService $designationService;
    public function __construct(DesignationService $designationService)
    {
        $this->designationService = $designationService;
    }

    public function index(Request $request)
{
    $designations = $this->designationService->index(
        $request->only([
            'search',
            'per_page',
        ])
    );

    return ApiResponse::success(
        DesignationResource::collection($designations),
        'Designations fetched successfully'
    );
}

    public function store(StoreDesignationRequest $request)
    {
        $designation = $this->designationService
            ->create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Designation created successfully',
            'data' => new DesignationResource($designation)
        ], 201);
    }

    public function show($id)
    {
        $designation = $this->designationService
            ->find($id);
        return response()->json([
            'status' => true,
            'message' => 'Designation fetched successfully',
            'data' => new DesignationResource($designation)
        ]);
    }

    public function update(UpdateDesignationRequest $request, $id)
    {
        $designation = $this->designationService
            ->update(
                $id,
                $request->validated()
            );
        return response()->json([
            'status' => true,
            'message' => 'Designation updated successfully',
            'data' => new DesignationResource($designation)
        ]);
    }

    public function destroy($id)
    {
        $this->designationService
            ->delete($id);
        return response()->json([
            'status' => true,
            'message' => 'Designation deleted successfully'
        ]);
    }

    public function changeStatus($id)
    {
        $designation = $this->designationService
            ->changeStatus($id);
        return response()->json([
            'status' => true,
            'message' => 'Designation status updated successfully',
            'data' => new DesignationResource($designation)
        ]);
    }
}
