<?php

namespace Database\Seeders;

use App\Models\TaskPriority;
use Illuminate\Database\Seeder;

class TaskPrioritySeeder extends Seeder
{
    public function run(): void
    {
        $priorities = [

            [
                'name'   => 'Low',
                'level'  => 1,
                'color'  => '#10B981',
                'status' => true,
            ],

            [
                'name'   => 'Medium',
                'level'  => 2,
                'color'  => '#3B82F6',
                'status' => true,
            ],

            [
                'name'   => 'High',
                'level'  => 3,
                'color'  => '#F59E0B',
                'status' => true,
            ],

            [
                'name'   => 'Critical',
                'level'  => 4,
                'color'  => '#EF4444',
                'status' => true,
            ],

            [
                'name'   => 'Urgent',
                'level'  => 5,
                'color'  => '#991B1B',
                'status' => true,
            ],

        ];

        foreach ($priorities as $priority) {

            TaskPriority::updateOrCreate(

                ['name' => $priority['name']],

                $priority

            );
        }
    }
}
