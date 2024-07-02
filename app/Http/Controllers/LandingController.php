<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    private $mentorRepository, $companyRepository;

    public function __construct(MentorRepository $mentorRepository, CompanyRepository $companyRepository){
        $this->mentorRepository = $mentorRepository;
        $this->companyRepository = $companyRepository;
    }

    //
    public function home() {
        return Inertia::render('Landing/Home/View',[]);
    }

    public function contactUs() {
        return Inertia::render('Landing/Contact/View',[]);
    }

    public function login() {
        // dd(12);
        return Inertia::render('Landing/Login/View',[]);
    }

    public function signup() {
        $data = $request->only(['name', 'email', 'phone', 'username', 'password', 'qualifications', 'industry_sector',
        'mentored_compnay','functional_area','hear_about_us','number_of_companies','additional_information']);
        return Inertia::render('Landing/SignUp/View', [
            "formData" => $data
        ]);
    }

    public function companyDetails() {
        return Inertia::render('Landing/CompanyDetails/View',[]);
    }
    public function partialMatched() {
        return Inertia::render('Landing/Dashboard/PartialMatched/View');
    }
    public function matched() {
        return Inertia::render('Landing/Dashboard/Matched/View');
    }
    public function profile() {
        return Inertia::render('Landing/Profile/View',[]);
    }

    public function privacy() {
        return Inertia::render('Landing/Privacy/View',[]);
    }

    public function terminology() {
        return Inertia::render('Landing/Terminology/View',[]);
    }

    public function dashBoard() {
        return Inertia::render('Landing/Dashboard/View',[]);
    }
    public function profileSetting() {
        return Inertia::render(('Landing/Dashboard/Settings/ProfileSettings/View'));
    }
    public function accountSetting() {
        return Inertia::render(('Landing/Dashboard/Settings/AccountSettings/View'));
    }
}
