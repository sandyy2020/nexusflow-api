<?php

namespace App\Services\Designation;

use App\Models\Designation;

class DesignationService
{
    public function index(array $filters = [])
{
    $query = Designation::with('department');

    // Search
    if (!empty($filters['search'])) {
        $search = $filters['search'];

        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhereHas('department', function ($department) use ($search) {
                  $department->where('name', 'like', "%{$search}%");
              });
        });
    }

    $perPage = $filters['per_page'] ?? 10;

    return $query
        ->latest()
        ->paginate($perPage);
}

    public function create(array $data)
    {
        return Designation::create($data);
    }

    public function find($id)
    {
        return Designation::with('department')
            ->findOrFail($id);
    }

    public function update($id, array $data)
    {
        $designation = Designation::findOrFail($id);

        $designation->update($data);

        return $designation;
    }

    public function delete($id)
    {
        $designation = Designation::findOrFail($id);

        return $designation->delete();
    }

    public function changeStatus($id)
    {
        $designation = Designation::findOrFail($id);

        $designation->update([
            'status' => !$designation->status
        ]);

        return $designation;
    }

}