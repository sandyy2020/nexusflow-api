<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Repositories\Project\ProjectRepository;
use Illuminate\Support\Facades\DB;

class ProjectService
{
    protected ProjectRepository $repository;

    public function __construct(ProjectRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll($request)
    {
        return $this->repository->getAll($request);
    }

    public function findById(int $id): Project
    {
        return $this->repository->findById($id);
    }

    public function create(array $data): Project
    {
        return DB::transaction(function () use ($data) {
            return $this->repository->create($data);
        });
    }

    public function update(Project $project, array $data): Project
    {
        return DB::transaction(function () use ($project, $data) {
            return $this->repository->update($project, $data);
        });
    }

    public function delete(Project $project): void
    {
        DB::transaction(function () use ($project) {
            $this->repository->delete($project);
        });
    }

    public function changeStatus(Project $project, bool $status): Project
    {
        return $this->repository->changeStatus($project, $status);
    }
}
