<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
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
            'name'          => ['required', 'string', 'max:255', 'unique:teams,name'],
            'code'          => ['required', 'string', 'max:50', 'unique:teams,code'],
            'description'   => ['nullable', 'string'],
            'status'        => ['required', 'boolean'],
        ];
    }
}
