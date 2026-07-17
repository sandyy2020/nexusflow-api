<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;

class StoreUserRequest extends ApiRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150|unique:users,email',
            'phone' => 'nullable|string|max:20|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
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

            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',

            'role.required' => 'Please select a role.',
            'role.exists' => 'Selected role is invalid.',

            'department_id.required' => 'Please select a department.',
            'department_id.exists' => 'Selected department is invalid.',

            'status.required' => 'Status is required.',
            'status.boolean' => 'Status must be true or false.',
        ];
    }
}
