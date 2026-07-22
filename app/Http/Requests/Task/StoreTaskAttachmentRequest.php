<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskAttachmentRequest extends FormRequest
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

            'file' => [
                'required',
                'file',
                'max:10240', // 10 MB
                'mimes:jpg,jpeg,png,gif,webp,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar,txt,csv',
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
            'file.required' => 'Please select a file.',
            'file.max' => 'Maximum upload size is 10 MB.',
        ];
    }
}