<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_comments', function (Blueprint $table) {

            $table->id();

            $table->foreignId('task_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('parent_comment_id')
                ->nullable()
                ->constrained('task_comments')
                ->nullOnDelete();

    
            $table->longText('comment');


            $table->json('mentions')
                ->nullable();

        
            $table->boolean('is_edited')
                ->default(false);

         
            $table->timestamp('edited_at')
                ->nullable();

           
            $table->boolean('is_pinned')
                ->default(false);

           
            $table->json('metadata')
                ->nullable();


            $table->boolean('status')
                ->default(true);


            $table->softDeletes();

            $table->timestamps();

            $table->index([
                'task_id',
                'status'
            ]);

            $table->index([
                'user_id',
                'status'
            ]);

            $table->index([
                'parent_comment_id',
                'status'
            ]);

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_comments');
    }
};