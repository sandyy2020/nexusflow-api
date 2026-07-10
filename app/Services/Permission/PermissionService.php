<?php

namespace App\Services\Permission;


use App\Models\Permission;


class PermissionService
{


    public function getAll()
    {
        return Permission::latest()->get();
    }



    public function create(array $data)
    {

        return Permission::create([

            'name' => $data['name'],

            'guard_name' => 'api',

        ]);

    }
    public function find($id)
    {
        return Permission::findOrFail($id);
    }
    public function update($id, array $data)
    {
        $permission = $this->find($id);
        $permission->update([
            'name'=>$data['name']
        ]);
        return $permission;

    }

    public function delete($id)
    {
        $permission = $this->find($id);
        return $permission->delete();

    }

}