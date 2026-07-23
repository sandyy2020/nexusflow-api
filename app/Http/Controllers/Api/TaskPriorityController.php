<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaskPriority;

class TaskPriorityController extends Controller
{
    public function index(Request $request)
    {
        $priorities = TaskPriority::where('status', true)
            ->paginate(
                $request->get('per_page', 10)
            );

        return response()->json($priorities);
    }
}
