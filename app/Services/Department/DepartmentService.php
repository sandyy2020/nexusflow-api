<?php

namespace App\Services\Department;

use App\Models\Department;

class DepartmentService
{
    public function index(array $filters = [])
    {
        return Department::with('manager')
            ->when(isset($filters['search']) && $filters['search'], function ($query) use ($filters) {
                $query->where(function ($q) use ($filters) {
                    $q->where('name', 'like', "%{$filters['search']}%")
                      ->orWhere('code', 'like', "%{$filters['search']}%");
                });
            })
            ->latest()
            ->paginate($filters['per_page'] ?? 10);
    }

    public function store(array $data)
    {
        return Department::create($data);
    }

    public function show(Department $department)
    {
        return $department->load('manager');
    }

    public function update(Department $department, array $data)
    {
        $department->update($data);

        return $department->fresh()->load('manager');
    }

    public function destroy(Department $department)
    {
        return $department->delete();
    }

    public function changeStatus(Department $department)
    {
        $department->status = !$department->status;
        $department->save();

        return $department;
    }
}