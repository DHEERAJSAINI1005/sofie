<?php

namespace App\Repository;

use App\Repository\Interface\MentorRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\{
    User,
};
class MentorRepository implements MentorRepositoryInterface {

    public function getList(){
        $list = User::select('id','email','phone','created_at')->get();
        return $list;
    }

    public function getData($id) {
        try {
            $data = User::find($id);

            return [
                'success' => true,
                'data' => $data,
                'message' => "Get mentor details successfully",
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
