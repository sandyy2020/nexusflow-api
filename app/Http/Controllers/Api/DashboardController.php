<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Services\Dashboard\DashboardService;
use Exception;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected DashboardService $dashboardService
    ) {
    }

    /**
     * Display dashboard data.
     */
    public function index()
    {
        try {

            $dashboardData = $this->dashboardService->getDashboardData();

            return ApiResponse::success(
                new DashboardResource($dashboardData),
                'Dashboard data fetched successfully'
            );

        } catch (Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }
}