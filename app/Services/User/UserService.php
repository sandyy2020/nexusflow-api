<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserService
{
    public function index()
    {
        $query = User::with([
            'roles',
            'department',
        ]);

        if (request()->filled('search')) {

            $query->where(function ($q) {

                $q->where('name', 'like', '%' . request('search') . '%')
                    ->orWhere('email', 'like', '%' . request('search') . '%');
            });
        }

        return $query
            ->latest()
            ->paginate(request('per_page', 10));
    }

    public function store(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'department_id' => $data['department_id'] ?? null,
                'password' => $data['password'],
                'status' => $data['status'],
            ]);
            $user->assignRole($data['role']);
            if ($data['role'] === 'Super Admin') {
                $role = Role::findByName('Super Admin', 'api');
                $role->syncPermissions(Permission::all());
            }
            return $user->load('roles');
        });
    }

    public function show(User $user): User
    {
        return $user->load([
            'roles',
            'department',
        ]);
    }

    public function update(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {

            $user->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'department_id' => $data['department_id'] ?? null,
                'status' => $data['status'],
            ]);

            if (! empty($data['password'])) {
                $user->update([
                    'password' => $data['password'],
                ]);
            }

            $user->syncRoles([$data['role']]);
            if ($data['role'] === 'Super Admin') {
                $role = Role::findByName('Super Admin', 'api');
                $role->syncPermissions(Permission::all());
            }
            return $user->load([
                'roles',
                'department',
            ]);
        });
    }

    public function destroy(User $user): void
    {
        $user->delete();
    }

    public function changeStatus(User $user, bool $status): User
    {
        $user->update([
            'status' => $status,
        ]);

        return $user;
    }

    public function assignRole(User $user, string $role): User
    {
        $user->syncRoles([$role]);
        if ($role === 'Super Admin') {
            $superAdminRole = Role::findByName('Super Admin', 'api');
            $superAdminRole->syncPermissions(Permission::all());
        }
        return $user->load('roles');
    }
}
