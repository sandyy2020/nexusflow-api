<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'task_id' => [
                'required',
                'exists:tasks,id',
            ],

            'parent_comment_id' => [
                'nullable',
                'exists:task_comments,id',
            ],

            'comment' => [
                'required',
                'string',
                'max:10000',
            ],

            'mentions' => [
                'nullable',
                'array',
            ],

            'mentions.*' => [
                'integer',
                'exists:users,id',
            ],

            'is_pinned' => [
                'nullable',
                'boolean',
            ],

            'metadata' => [
                'nullable',
                'array',
            ],

            'status' => [
                'nullable',
                'boolean',
            ],

        ];
    }

    public function messages(): array
    {
        return [
            'task_id.required' => 'Task is required.',
            'task_id.exists' => 'Selected task does not exist.',
            'parent_comment_id.exists' => 'Invalid parent comment.',
            'comment.required' => 'Comment is required.',
            'comment.max' => 'Comment may not exceed 10000 characters.',
            'mentions.array' => 'Mentions must be an array.',
            'mentions.*.exists' => 'One or more mentioned users are invalid.',
        ];
    }
}