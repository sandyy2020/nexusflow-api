<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Designation;

class Department extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'manager_id',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function designations()
    {
        return $this->hasMany(Designation::class);
    }
}
