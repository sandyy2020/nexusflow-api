<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class AssignTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'user_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'user_ids.*' => [
                'required',
                'integer',
                'exists:users,id',
                'distinct',
            ],

        ];
    }

    public function attributes(): array
    {
        return [

            'user_ids' => 'users',
            'user_ids.*' => 'user',

        ];
    }

    public function messages(): array
    {
        return [

            'user_ids.required' => 'Please select at least one user.',
            'user_ids.array' => 'Users must be an array.',
            'user_ids.min' => 'Please select at least one user.',

            'user_ids.*.exists' => 'One or more selected users do not exist.',
            'user_ids.*.distinct' => 'Duplicate users are not allowed.',

        ];
    }
}
