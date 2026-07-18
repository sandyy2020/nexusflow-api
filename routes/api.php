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
});
