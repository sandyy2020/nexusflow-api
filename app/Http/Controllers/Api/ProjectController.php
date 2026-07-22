<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Project\ProjectCollection;
use App\Http\Resources\Project\ProjectResource;
use App\Models\Project;
use App\Services\Project\ProjectService;
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
        $projects = $this->projectService->getAll($request);

        return ApiResponse::success(
            new ProjectCollection($projects),
            'Projects fetched successfully.'
        );
    }

    public function store(StoreProjectRequest $request)
    {
        $project = $this->projectService->create(
            $request->validated()
        );

        return ApiResponse::success(
            new ProjectResource($project),
            'Project created successfully.',
            201
        );
    }

    public function show(Project $project)
    {
        $project = $this->projectService->findById($project->id);

        return ApiResponse::success(
            new ProjectResource($project),
            'Project fetched successfully.'
        );
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project = $this->projectService->update(
            $project,
            $request->validated()
        );

        return ApiResponse::success(
            new ProjectResource($project),
            'Project updated successfully.'
        );
    }

    public function destroy(Project $project)
    {
        $this->projectService->delete($project);

        return ApiResponse::success(
            null,
            'Project deleted successfully.'
        );
    }

    public function changeStatus(Request $request, Project $project)
    {
        $request->validate([
            'status' => 'required|boolean',
        ]);

        $project = $this->projectService->changeStatus(
            $project,
            $request->status
        );

        return ApiResponse::success(
            new ProjectResource($project),
            'Project status updated successfully.'
        );
    }
}