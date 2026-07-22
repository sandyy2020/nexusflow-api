<?php

namespace App\Repositories\Project;

use App\Models\Project;

class ProjectRepository
{
    public function getAll($request)
    {
        $query = Project::with([
            'department',
            'teams',
            'projectManager',
        ]);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('code', 'like', "%{$request->search}%")
                    ->orWhere('client_name', 'like', "%{$request->search}%");
            });
        }

        return $query->latest()->paginate(
            $request->get('per_page', 10)
        );
    }

    public function findById(int $id): Project
    {
        return Project::with([
            'department',
            'teams',
            'projectManager',
        ])->findOrFail($id);
    }

    public function create(array $data): Project
    {
        $teamIds = $data['team_ids'] ?? [];

        unset($data['team_ids']);

        $project = Project::create($data);

        if (!empty($teamIds)) {
            $project->teams()->sync($teamIds);
        }

        return $project->load([
            'department',
            'teams',
            'projectManager',
        ]);
    }

    public function update(Project $project, array $data): Project
    {
        $teamIds = $data['team_ids'] ?? [];

        unset($data['team_ids']);

        $project->update($data);

        $project->teams()->sync($teamIds);

        return $project->load([
            'department',
            'teams',
            'projectManager',
        ]);
    }

    public function delete(Project $project): void
    {
        $project->teams()->detach();

        $project->delete();
    }

    public function changeStatus(Project $project, bool $status): Project
    {
        $project->update([
            'status' => $status,
        ]);

        return $project->fresh([
            'department',
            'teams',
            'projectManager',
        ]);
    }
}
