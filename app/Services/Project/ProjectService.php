<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Repositories\Project\ProjectRepository;

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

    public function findById($id)
    {
        return $this->repository->findById($id);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update(Project $project, array $data)
    {
        return $this->repository->update($project, $data);
    }

    public function delete(Project $project)
    {
        return $this->repository->delete($project);
    }

    public function changeStatus(Project $project, bool $status)
    {
        return $this->repository->changeStatus($project, $status);
    }
}
