<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;

class UpdateUserRequest extends ApiRequest
{
    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:users,email,'.$userId,
            'phone' => 'nullable|string|max:20|unique:users,phone,'.$userId,
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'role' => 'required|exists:roles,name',
            'department_id' => 'required|exists:departments,id',
            'status' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',

            'email.required' => 'Email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email already exists.',

            'phone.unique' => 'This phone number already exists.',

            'avatar.image' => 'Avatar must be an image.',
            'avatar.mimes' => 'Avatar must be a JPG, JPEG, or PNG image.',
            'avatar.max' => 'Avatar size must not exceed 2 MB.',

            'role.required' => 'Please select a role.',
            'role.exists' => 'Selected role is invalid.',

            'department_id.required' => 'Please select a department.',
            'department_id.exists' => 'Selected department is invalid.',

            'status.required' => 'Status is required.',
            'status.boolean' => 'Status must be true or false.',
        ];
    }
}
