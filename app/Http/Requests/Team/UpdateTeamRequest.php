<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'department_id' => ['required', 'exists:departments,id'],
            'team_lead_id'  => ['nullable', 'exists:users,id'],

            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('teams')->ignore($this->team),
            ],

            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('teams')->ignore($this->team),
            ],

            'description' => ['nullable', 'string'],

            'status' => ['required', 'boolean'],
        ];
    }
}
