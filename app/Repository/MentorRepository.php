<?php

namespace App\Repository;

use App\Repository\Interface\MentorRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\{
    Mentor,
};
class MentorRepository implements MentorRepositoryInterface {

    public function getList(){
        $list = Mentor::select('id','email','phone','created_at')->get();
        return $list;
    }

    public function saveData($data){
        try {
            $data["name"] = $data['name'];
            $data["email"] = $data['email'];
            $data["phone"] = $data['phone'];
            $data["username"] = $data['username'];
            $data["password"] = $data['password'];
            $data["qualifications"] = $data['qualifications'];
            $data["industry_sector"] = $data['industry_sector'];
            $data["mentored_compnay"] = $data['mentored_compnay'];
            $data["functional_area"] = $data['functional_area'];
            $data["hear_about_us"] = $data['hear_about_us'];
            $data["number_of_companies"] = $data['number_of_companies'];
            $data["additional_information"] = $data['additional_information'];

            if(isset($data['id'])){
                $job = Mentor::findOrFail($data['id']);
                $job->update($data);
            } else {
                $job = Mentor::create($data);
            }

            return [
                'success' => true,
                'data' => $job,
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}
