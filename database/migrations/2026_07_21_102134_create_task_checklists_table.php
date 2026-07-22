<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->foreignId('completed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_completed')
                ->default(false);

            $table->timestamp('completed_at')
                ->nullable();
            $table->integer('sort_order')
                ->default(0);
            $table->boolean('status')
                ->default(true);
            $table->softDeletes();
            $table->timestamps();
            $table->index('task_id');
            $table->index('assigned_to');
            $table->index('completed_by');
            $table->index('is_completed');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_checklists');
    }
};