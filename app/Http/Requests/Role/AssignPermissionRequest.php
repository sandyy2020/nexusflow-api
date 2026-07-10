<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\ApiRequest;

class AssignPermissionRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'permissions' => ['required', 'array', 'min:1'],
            'permissions.*' => ['required', 'string', 'exists:permissions,name'],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'permissions.required' => 'Please select at least one permission.',
            'permissions.array' => 'Permissions must be an array.',
            'permissions.min' => 'Please select at least one permission.',

            'permissions.*.required' => 'Permission name is required.',
            'permissions.*.string' => 'Permission must be a string.',
            'permissions.*.exists' => 'One or more selected permissions are invalid.',
        ];
    }
}