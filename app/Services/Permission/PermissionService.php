<?php

namespace App\Services\Permission;

// use App\Models\Permission;
use Spatie\Permission\Models\Permission;

class PermissionService
{
    public function getAll($request)
    {
        // return Permission::latest()->get();
        $query = Permission::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return $query
            ->latest()
            ->paginate($request->per_page ?? 10);
    }

    public function create(array $data)
    {
        return Permission::create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);
        $superAdminRole = Role::where('name', 'Super Admin')
            ->where('guard_name', 'web')
            ->first();

        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permission);
        }

        return $permission;
    }

    public function find($id)
    {
        return Permission::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $permission = $this->find($id);
        $permission->update([
            'name' => $data['name'],
        ]);

        return $permission;
    }

    public function delete($id)
    {
        $permission = $this->find($id);

        return $permission->delete();
    }
}
