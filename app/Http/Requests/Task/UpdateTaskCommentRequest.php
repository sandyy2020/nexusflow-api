<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'comment' => [
                'sometimes',
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
            'comment.required' => 'Comment is required.',
            'comment.max' => 'Comment may not exceed 10000 characters.',
            'mentions.*.exists' => 'One or more mentioned users are invalid.',
        ];
    }
}