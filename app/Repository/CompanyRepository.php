<?php

namespace App\Repository;

use App\Repository\Interface\CompanyRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\{
    Company,
};
class CompanyRepository implements CompanyRepositoryInterface {

    public function getList(){
        $list = Company::select('id','company_name','company_uen','created_at')->get();
        return $list;
    }

    public function saveData($data){
        try {
            $data["company_name"] = $data['company_name'];
            $data["company_uen"] = $data['company_uen'];
            $data["phone"] = $data['phone'];
            $data["username"] = $data['username'];
            $data["password"] = $data['password'];
            $data["position"] = $data['position'];
            $data["founded_year"] = $data['founded_year'];
            $data["team_size"] = $data['team_size'];
            $data["current_revenue"] = $data['current_revenue'];
            $data["current_customers_base_size"] = $data['current_customers_base_size'];
            $data["industry_sector"] = $data['industry_sector'];
            $data["description"] = $data['description'];
            $data["function_area_1"] = $data['function_area_1'];
            $data["function_area_2"] = $data['function_area_2'];
            $data["function_area_3"] = $data['function_area_3'];
            $data["hear_about_us"] = $data['hear_about_us'];
            $data["current_problem"] = $data['current_problem'];
            $data["additional_information"] = $data['additional_information'];

            if(isset($data['id'])){
                $job = Company::findOrFail($data['id']);
                $job->update($data);
            } else {
                $job = Company::create($data);
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
