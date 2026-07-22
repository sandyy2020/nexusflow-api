<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id' => [
                'required',
                'exists:projects,id',
            ],

            'parent_task_id' => [
                'nullable',
                'exists:tasks,id',
            ],

            'task_status_id' => [
                'nullable',
                'exists:task_statuses,id',
            ],

            'task_priority_id' => [
                'nullable',
                'exists:task_priorities,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'progress' => [
                'nullable',
                'integer',
                'between:0,100',
            ],

            'story_points' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'estimated_hours' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'actual_hours' => [
                'nullable',
                'numeric',
                'min:0',
            ],


            'start_date' => [
                'nullable',
                'date',
            ],

            'due_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'is_billable' => [
                'boolean',
            ],

            'metadata' => [
                'nullable',
                'array',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'status' => [
                'boolean',
            ],

        ];
    }

    public function attributes(): array
    {
        return [

            'project_id' => 'project',
            'parent_task_id' => 'parent task',
            'task_status_id' => 'task status',
            'task_priority_id' => 'task priority',

        ];
    }

    public function messages(): array
    {
        return [

            'project_id.required' => 'Project is required.',

            'project_id.exists' => 'Selected project does not exist.',

            'due_date.after_or_equal' =>
                'Due date must be greater than or equal to start date.',

            'progress.between' =>
                'Progress must be between 0 and 100.',

        ];
    }
}