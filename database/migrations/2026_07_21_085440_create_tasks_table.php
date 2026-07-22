<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_code')
                ->unique();
            $table->foreignId('project_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('parent_task_id')
                ->nullable()
                ->constrained('tasks')
                ->nullOnDelete();
            $table->foreignId('task_status_id')
                ->nullable()
                ->constrained('task_statuses')
                ->nullOnDelete();
            $table->foreignId('task_priority_id')
                ->nullable()
                ->constrained('task_priorities')
                ->nullOnDelete();
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('title');
            $table->text('description')
                ->nullable();
            $table->integer('progress')
                ->default(0);
            $table->integer('story_points')
                ->nullable();
            $table->decimal('estimated_hours', 8, 2)
                ->nullable();
            $table->decimal('actual_hours', 8, 2)
                ->nullable();
            $table->date('start_date')
                ->nullable();
            $table->date('due_date')
                ->nullable();
            $table->timestamp('completed_at')
                ->nullable();
            $table->boolean('is_billable')
                ->default(false);
            $table->json('metadata')
                ->nullable();
            $table->integer('sort_order')
                ->default(0);
            $table->boolean('status')
                ->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
