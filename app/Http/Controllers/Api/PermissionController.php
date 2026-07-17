<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Permission\PermissionService;
use App\Http\Resources\PermissionResource;
use App\Helpers\ApiResponse;


class PermissionController extends Controller
{

    protected PermissionService $permissionService;


    public function __construct(
        PermissionService $permissionService
    )
    {
        $this->permissionService = $permissionService;
    }



    public function index(Request $request)
    {
        try {

            $permissions = 
                $this->permissionService->getAll($request);


            return ApiResponse::success(
                PermissionResource::collection($permissions),
                'Permissions fetched successfully'
            );


        } catch(\Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            );

        }
    }




    public function store(Request $request)
    {

        try {

            $request->validate([
                'name'=>'required|unique:permissions,name'
            ]);


            $permission =
                $this->permissionService
                ->create($request->all());


            return ApiResponse::success(
                new PermissionResource($permission),
                'Permission created successfully',
                201
            );


        } catch(\Exception $e) {


            return ApiResponse::error(
                $e->getMessage()
            );

        }

    }





    public function show($id)
    {

        try {

            $permission =
                $this->permissionService
                ->find($id);


            return ApiResponse::success(
                new PermissionResource($permission),
                'Permission fetched successfully'
            );


        } catch(\Exception $e) {


            return ApiResponse::error(
                $e->getMessage(),
                null,
                404
            );

        }

    }





    public function update(Request $request,$id)
    {

        try {

            $request->validate([
                'name'=>'required'
            ]);


            $permission =
                $this->permissionService
                ->update($id,$request->all());


            return ApiResponse::success(
                new PermissionResource($permission),
                'Permission updated successfully'
            );


        } catch(\Exception $e) {


            return ApiResponse::error(
                $e->getMessage()
            );

        }

    }





    public function destroy($id)
    {

        try {

            $this->permissionService
            ->delete($id);


            return ApiResponse::success(
                null,
                'Permission deleted successfully'
            );


        } catch(\Exception $e) {


            return ApiResponse::error(
                $e->getMessage()
            );

        }

    }

}