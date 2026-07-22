<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('project_manager_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('client_name')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->enum('priority', [
                'Low',
                'Medium',
                'High',
                'Critical'
            ])->default('Low');
            $table->enum('project_status', [
                'Planning',
                'Active',
                'On Hold',
                'Completed',
                'Cancelled'
            ])->default('Planning');
           $table->unsignedTinyInteger('progress')->default(0);
            $table->decimal('budget', 12, 2)->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};