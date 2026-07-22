<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Api\DesignationController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TaskAttachmentController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('/test', function () {
//     return response()->json([
//         'message' => 'Nexus Api is Running and used for testing purpose only',
//     ]);

// });

Route::get('/test-user', function () {
    $user = User::first();

    return new UserResource($user);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
Route::middleware(['auth:sanctum'])->group(function () {

    // User Management
    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:view users');
    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:create users');
    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:view users');
    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:edit users');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:delete users');
    Route::patch('/users/{user}/status', [UserController::class, 'changeStatus'])
        ->middleware('permission:edit users');
    Route::post('/users/{user}/assign-role', [UserController::class, 'assignRole'])
        ->middleware('permission:edit users');

    // Role Management
    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:view roles');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:create roles');

    Route::get('/roles/{role}', [RoleController::class, 'show'])
        ->middleware('permission:view roles');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:edit roles');

    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:delete roles');

    // Permissions
    Route::get('/role/permissions', [RoleController::class, 'permissions'])
        ->middleware('permission:view roles');

    Route::post('/roles/{role}/permissions', [RoleController::class, 'assignPermissions'])
        ->middleware('permission:edit roles');

    // Permission Management

    Route::get('/permissions', [PermissionController::class, 'index'])
        ->middleware('permission:view permissions');

    Route::post('/permissions', [PermissionController::class, 'store'])
        ->middleware('permission:create permissions');

    Route::get('/permissions/{permission}', [PermissionController::class, 'show'])
        ->middleware('permission:view permissions');

    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])
        ->middleware('permission:edit permissions');

    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])
        ->middleware('permission:delete permissions');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('permission:view dashboard');

    // Department Management
    Route::get('/departments', [DepartmentController::class, 'index'])
        ->middleware('permission:view departments');

    Route::post('/departments', [DepartmentController::class, 'store'])
        ->middleware('permission:create departments');

    Route::get('/departments/{department}', [DepartmentController::class, 'show'])
        ->middleware('permission:view departments');

    Route::put('/departments/{department}', [DepartmentController::class, 'update'])
        ->middleware('permission:edit departments');

    Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])
        ->middleware('permission:delete departments');

    Route::patch('/departments/{department}/status', [DepartmentController::class, 'changeStatus'])
        ->middleware('permission:edit departments');

    //Designation Management
    Route::get('/designations', [DesignationController::class, 'index'])
        ->middleware('permission:view designations');

    Route::post('/designations', [DesignationController::class, 'store'])
        ->middleware('permission:create designations');

    Route::get('/designations/{designation}', [DesignationController::class, 'show'])
        ->middleware('permission:view designations');

    Route::put('/designations/{designation}', [DesignationController::class, 'update'])
        ->middleware('permission:edit designations');

    Route::delete('/designations/{designation}', [DesignationController::class, 'destroy'])
        ->middleware('permission:delete designations');

    Route::patch('/designations/{designation}/status', [DesignationController::class, 'changeStatus'])
        ->middleware('permission:edit designations');

    Route::middleware('permission:view teams')->group(function () {
        Route::get('/teams', [TeamController::class, 'index']);
        Route::get('/teams/{team}', [TeamController::class, 'show']);
    });

    Route::middleware('permission:create teams')->group(function () {
        Route::post('/teams', [TeamController::class, 'store']);
    });

    Route::middleware('permission:edit teams')->group(function () {
        Route::put('/teams/{team}', [TeamController::class, 'update']);
        Route::patch('/teams/{team}/status', [TeamController::class, 'changeStatus']);
    });

    Route::middleware('permission:delete teams')->group(function () {
        Route::delete('/teams/{team}', [TeamController::class, 'destroy']);
    });

    Route::get('/teams/department/{department}/users', [UserController::class, 'usersByDepartment'])
        ->middleware('permission:view teams');

    // Project Management
    Route::middleware('permission:view projects')->group(function () {

        Route::get('/projects', [ProjectController::class, 'index']);

        Route::get('/projects/{project}', [ProjectController::class, 'show']);
    });

    Route::middleware('permission:create projects')->group(function () {

        Route::post('/projects', [ProjectController::class, 'store']);
    });

    Route::middleware('permission:edit projects')->group(function () {

        Route::put('/projects/{project}', [ProjectController::class, 'update']);

        Route::patch('/projects/{project}/status', [ProjectController::class, 'changeStatus']);
    });

    Route::middleware('permission:delete projects')->group(function () {

        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    });

    Route::get('/departments/{department}/teams', [TeamController::class, 'teamsByDepartment'])
        ->middleware('permission:view projects');

    Route::get('/teams/{team}/users', [UserController::class, 'usersByTeam'])
        ->middleware('permission:view projects');

    Route::apiResource('tasks', TaskController::class);

Route::patch(
    'tasks/{task}/status',
    [TaskController::class, 'changeStatus']
);

Route::patch(
    'tasks/{id}/restore',
    [TaskController::class, 'restore']
);

Route::delete(
    'tasks/{id}/force-delete',
    [TaskController::class, 'forceDelete']
);

Route::post(
    'tasks/{task}/assign-users',
    [TaskController::class, 'assignUsers']
);

Route::delete(
    'tasks/{task}/assigned-users/{userId}',
    [TaskController::class, 'removeAssignedUser']
);

Route::put(
    'tasks/{task}/sync-assignments',
    [TaskController::class, 'syncAssignments']
);

Route::patch(
    'tasks/{task}/workflow-status',
    [TaskController::class, 'changeTaskStatus']
);

Route::patch(
    'tasks/{task}/priority',
    [TaskController::class, 'changeTaskPriority']
);

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('task-attachments')
        ->controller(TaskAttachmentController::class)
        ->group(function () {

            Route::get('/', 'index')
                ->middleware('permission:view task attachments');

            Route::post('/', 'store')
                ->middleware('permission:create task attachments');

            Route::get('/{taskAttachment}', 'show')
                ->middleware('permission:view task attachments');

            Route::put('/{taskAttachment}', 'update')
                ->middleware('permission:edit task attachments');

            Route::delete('/{taskAttachment}', 'destroy')
                ->middleware('permission:delete task attachments');

            Route::patch('/{taskAttachment}/status', 'changeStatus')
                ->middleware('permission:edit task attachments');

            Route::patch('/restore/{id}', 'restore')
                ->middleware('permission:restore task attachments');

            Route::delete('/force-delete/{id}', 'forceDelete')
                ->middleware('permission:force delete task attachments');

        });

});
});
