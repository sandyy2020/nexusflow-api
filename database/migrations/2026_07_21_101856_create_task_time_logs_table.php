<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_time_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->dateTime('start_time');
            $table->dateTime('end_time')
                ->nullable();
            $table->unsignedInteger('duration')
                ->default(0);
            $table->text('description')
                ->nullable();
            $table->boolean('is_billable')
                ->default(false);
            $table->boolean('status')
                ->default(true);
            $table->softDeletes();
            $table->timestamps();
            $table->index('task_id');
            $table->index('user_id');
            $table->index('start_time');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_time_logs');
    }
};