<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {

            /*
            |--------------------------------------------------------------------------
            | Unique Task Reference Code
            |--------------------------------------------------------------------------
            */

            $table->string('task_code')
                ->unique()
                ->after('id');


            /*
            |--------------------------------------------------------------------------
            | Dynamic Workflow Status
            |--------------------------------------------------------------------------
            */

            $table->foreignId('task_status_id')
                ->nullable()
                ->after('project_id')
                ->constrained('task_statuses')
                ->nullOnDelete();


            /*
            |--------------------------------------------------------------------------
            | Dynamic Priority
            |--------------------------------------------------------------------------
            */

            $table->foreignId('task_priority_id')
                ->nullable()
                ->after('task_status_id')
                ->constrained('task_priorities')
                ->nullOnDelete();


            /*
            |--------------------------------------------------------------------------
            | Remove fixed enum workflow fields
            |--------------------------------------------------------------------------
            */

            $table->dropColumn([
                'priority',
                'task_status'
            ]);


            /*
            |--------------------------------------------------------------------------
            | Remove single assignment
            |--------------------------------------------------------------------------
            | Future:
            | task_assignments table handles multiple users
            |--------------------------------------------------------------------------
            */

            $table->dropForeign([
                'assigned_to'
            ]);

            $table->dropColumn('assigned_to');


            /*
            |--------------------------------------------------------------------------
            | Agile Management
            |--------------------------------------------------------------------------
            */

            $table->integer('story_points')
                ->nullable()
                ->after('progress');


            /*
            |--------------------------------------------------------------------------
            | Billing Support
            |--------------------------------------------------------------------------
            */

            $table->boolean('is_billable')
                ->default(false)
                ->after('actual_hours');


            /*
            |--------------------------------------------------------------------------
            | Extra Dynamic Data
            |--------------------------------------------------------------------------
            */

            $table->json('metadata')
                ->nullable()
                ->after('is_billable');


            /*
            |--------------------------------------------------------------------------
            | Performance Indexes
            |--------------------------------------------------------------------------
            */

            $table->index([
                'project_id',
                'task_status_id',
                'task_priority_id'
            ]);
        });
    }


    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign([
                'task_status_id'
            ]);
            $table->dropForeign([
                'task_priority_id'
            ]);
            $table->dropColumn([
                'task_code',
                'task_status_id',
                'task_priority_id',
                'story_points',
                'is_billable',
                'metadata'
            ]);
            $table->enum('priority', [
                'Low',
                'Medium',
                'High',
                'Critical'
            ])->default('Medium');
            $table->enum('task_status', [
                'Todo',
                'In Progress',
                'Review',
                'Testing',
                'Completed',
                'Cancelled'
            ])->default('Todo');
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
        });
    }
};
