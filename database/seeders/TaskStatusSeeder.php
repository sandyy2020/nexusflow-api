<?php

namespace Database\Seeders;

use App\Models\TaskStatus;
use Illuminate\Database\Seeder;

class TaskStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [

            [
                'name' => 'Backlog',
                'color' => '#6B7280',
                'sort_order' => 1,
                'is_completed' => false,
                'status' => true,
            ],

            [
                'name' => 'Todo',
                'color' => '#3B82F6',
                'sort_order' => 2,
                'is_completed' => false,
                'status' => true,
            ],

            [
                'name' => 'In Progress',
                'color' => '#F59E0B',
                'sort_order' => 3,
                'is_completed' => false,
                'status' => true,
            ],

            [
                'name' => 'Review',
                'color' => '#8B5CF6',
                'sort_order' => 4,
                'is_completed' => false,
                'status' => true,
            ],

            [
                'name' => 'Testing',
                'color' => '#EC4899',
                'sort_order' => 5,
                'is_completed' => false,
                'status' => true,
            ],

            [
                'name' => 'Completed',
                'color' => '#10B981',
                'sort_order' => 6,
                'is_completed' => true,
                'status' => true,
            ],

            [
                'name' => 'Cancelled',
                'color' => '#EF4444',
                'sort_order' => 7,
                'is_completed' => true,
                'status' => true,
            ],

        ];

        foreach ($statuses as $status) {

            TaskStatus::updateOrCreate(

                ['name' => $status['name']],

                $status

            );

        }
    }
}