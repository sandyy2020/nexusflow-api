<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'department_id'      => 'required|exists:departments,id',
            'team_id'            => 'required|exists:teams,id',
            'project_manager_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('projects', 'code')->ignore($this->project),
            ],
            'client_name' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'priority' => 'required|in:Low,Medium,High,Critical',
            'status' => 'required|in:Planning,Active,On Hold,Completed,Cancelled',
            'progress' => 'nullable|integer|min:0|max:100',
            'budget' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ];
    }
}
