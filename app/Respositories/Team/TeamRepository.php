<?php

namespace App\Repositories\Team;
use App\Models\Team;

class TeamRepository
{
    public function getAll($request)
    {
        return Team::with(['department', 'teamLead'])
            ->when($request->search, function ($query) use ($request) {
                $query->where('name', 'like', "%{$request->search}%")
                    ->orWhere('code', 'like', "%{$request->search}%");
            })
            ->latest()
            ->paginate($request->per_page ?? 10);
    }

    public function findById($id)
    {
        return Team::with(['department', 'teamLead'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Team::create($data);
    }

    public function update($team, array $data)
    {
        $team->update($data);

        return $team->fresh(['department', 'teamLead']);
    }

    public function delete($team)
    {
        return $team->delete();
    }

    public function changeStatus($team, bool $status)
    {
        $team->update([
            'status' => $status,
        ]);

        return $team;
    }
}
