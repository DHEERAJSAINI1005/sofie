<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repository\CompanyRepository;
use Illuminate\Support\Facades\Redirect;


class ProjectController extends Controller
{
    //
    private $companyRepository;

    public function __construct(CompanyRepository $companyRepository){
        $this->companyRepository = $companyRepository;
    }

    public function get($id) {
        $response = $this->companyRepository->get($id);
        return Inertia::render('Landing/Company/View',[
            'data' => $response['data'],
            ]
        );
    }

}
