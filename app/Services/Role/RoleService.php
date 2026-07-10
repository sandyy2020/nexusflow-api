<?php

namespace App\Services\Role;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleService
{
    
    public function index()
    {
        return Role::with('permissions')
            ->latest()
            ->paginate(10);
    }

    public function store(array $data): Role
    {
        return Role::create([
            'name' => $data['name'],
            'guard_name' => 'web',
        ]);
    }

    public function show(Role $role): Role
    {
        return $role->load('permissions');
    }

    public function update(Role $role, array $data): Role
    {
        $role->update([
            'name' => $data['name'],
        ]);

        return $role->load('permissions');
    }

    public function destroy(Role $role): void
    {
        if ($role->users()->exists()) {
            throw new \Exception('This role is assigned to users and cannot be deleted.');
        }

        $role->delete();
    }

    public function permissions()
    {
        return Permission::select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function assignPermissions(Role $role, array $permissions): Role
    {
        $role->syncPermissions($permissions);

        return $role->load('permissions');
    }
}