<?php

namespace App\Services\Team;

use App\Repositories\Team\TeamRepository;

class TeamService
{
    protected TeamRepository $repository;

    public function __construct(TeamRepository $repository)
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

    public function update($team, array $data)
    {
        return $this->repository->update($team, $data);
    }

    public function delete($team)
    {
        return $this->repository->delete($team);
    }

    public function changeStatus($team, bool $status)
    {
        return $this->repository->changeStatus($team, $status);
    }
}
