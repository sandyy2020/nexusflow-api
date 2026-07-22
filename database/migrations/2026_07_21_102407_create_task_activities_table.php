<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('action');
            $table->string('field_name')
                ->nullable();
            $table->text('old_value')
                ->nullable();
            $table->text('new_value')
                ->nullable();
            $table->json('metadata')
                ->nullable();
            $table->boolean('status')
                ->default(true);
            $table->timestamps();
            $table->index('task_id');
            $table->index('user_id');
            $table->index('action');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_activities');
    }
};