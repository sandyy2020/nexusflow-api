<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\ApiRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends ApiRequest
{
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('roles', 'name')->ignore($this->route('role')->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Role name is required.',
            'name.string'   => 'Role name must be a string.',
            'name.max'      => 'Role name must not exceed 100 characters.',
            'name.unique'   => 'This role already exists.',
        ];
    }
}