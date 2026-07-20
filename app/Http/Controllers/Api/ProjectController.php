<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Requests\Project\ChangeStatusRequest;
use App\Http\Resources\Project\ProjectCollection;
use App\Http\Resources\Project\ProjectResource;
use App\Models\Project;
use App\Services\Project\ProjectService;
use Exception;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(Request $request)
    {
        try {

            $projects = $this->projectService->getAll($request);

            return ApiResponse::success(
                new ProjectCollection($projects),
                'Projects fetched successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function store(StoreProjectRequest $request)
    {
        try {

            $project = $this->projectService->create(
                $request->validated()
            );

            return ApiResponse::success(
                new ProjectResource($project),
                'Project created successfully.',
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

    public function show(Project $project)
    {
        try {

            $project = $this->projectService->findById($project->id);

            return ApiResponse::success(
                new ProjectResource($project),
                'Project fetched successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        try {

            $project = $this->projectService->update(
                $project,
                $request->validated()
            );

            return ApiResponse::success(
                new ProjectResource($project),
                'Project updated successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function destroy(Project $project)
    {
        try {

            $this->projectService->delete($project);

            return ApiResponse::success(
                null,
                'Project deleted successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }

    public function changeStatus(ChangeStatusRequest $request, Project $project)
    {
        try {

            $project = $this->projectService->changeStatus(
                $project,
                $request->validated()['status']
            );

            return ApiResponse::success(
                new ProjectResource($project),
                'Project status updated successfully.'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage(),
                null,
                500
            );
        }
    }
}