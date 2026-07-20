<?php

namespace App\Repositories\Project;

use App\Models\Project;

class ProjectRepository
{
    public function getAll($request)
    {
        return Project::with(['department', 'team', 'manager'])
            ->when($request->search, function ($query) use ($request) {
                $query->where('name', 'like', "%{$request->search}%")
                    ->orWhere('code', 'like', "%{$request->search}%");
            })
            ->latest()
            ->paginate($request->per_page ?? 10);
    }

    public function findById($id)
    {
        return Project::with(['department', 'team', 'manager'])
            ->findOrFail($id);
    }

    public function create(array $data)
    {
        return Project::create($data);
    }

    public function update(Project $project, array $data)
    {
        $project->update($data);

        return $project->fresh(['department', 'team', 'manager']);
    }

    public function delete(Project $project)
    {
        return $project->delete();
    }

    public function changeStatus(Project $project, bool $status)
    {
        $project->update([
            'status' => $status,
        ]);

        return $project;
    }
}
