<?php

namespace App\Http\Requests\Department;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDepartmentRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
             'name' => 'required|string|max:255',

        'code' => [
            'required',
            Rule::unique('departments','code')
                ->ignore($this->department)
        ],

        'description' => 'nullable|string',
        'manager_id' => 'nullable|exists:users,id',
        'status' => 'boolean',
        ];
    }
}
