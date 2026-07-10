<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\ApiRequest;

class StoreRoleRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:roles,name',
        ];
    }

    /**
     * Custom validation messages.
     */
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