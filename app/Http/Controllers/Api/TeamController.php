<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Team\StoreTeamRequest;
use App\Http\Requests\Team\UpdateTeamRequest;
use App\Http\Requests\Team\ChangeStatusRequest;
use App\Http\Resources\Team\TeamCollection;
use App\Http\Resources\Team\TeamResource;
use App\Models\Team;
use App\Services\Team\TeamService;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    protected TeamService $teamService;

    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }

    public function index(Request $request)
    {
        $teams = $this->teamService->getAll($request);

        return ApiResponse::success(
            new TeamCollection($teams),
            'Teams fetched successfully.'
        );
    }

    public function store(StoreTeamRequest $request)
    {
        $team = $this->teamService->create($request->validated());

        return ApiResponse::success(
            new TeamResource($team),
            'Team created successfully.',
            201
        );
    }

    public function show(Team $team)
    {
        $team = $this->teamService->findById($team->id);

        return ApiResponse::success(
            new TeamResource($team),
            'Team fetched successfully.'
        );
    }

    public function update(UpdateTeamRequest $request, Team $team)
    {
        $team = $this->teamService->update(
            $team,
            $request->validated()
        );

        return ApiResponse::success(
            new TeamResource($team),
            'Team updated successfully.'
        );
    }

    public function destroy(Team $team)
    {
        $this->teamService->delete($team);

        return ApiResponse::success(
            null,
            'Team deleted successfully.'
        );
    }

    public function changeStatus(ChangeStatusRequest $request, Team $team)
    {
        $team = $this->teamService->changeStatus(
            $team,
            $request->status
        );

        return ApiResponse::success(
            new TeamResource($team),
            'Team status updated successfully.'
        );
    }
}
