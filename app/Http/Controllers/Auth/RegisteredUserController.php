<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', Rules\Password::defaults()],
            'username' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'qualifications' => 'required|string|max:255',
            'industry_sector' => 'required|string|max:255',
            'mentored_company' => 'required|string|max:255',
            'functional_area' => 'required|string|max:255',
            'hear_about_us' => 'required|string|max:255',
            'number_of_companies' => 'required|integer|min:1',
        ]);
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email_contact,
            'username' => $request->user_name,
            'phone' => $request->mobile_number,
            'password' => Hash::make($request->password),
            'qualifications' => $request->qualifications,
            'industry_sector' => $request->industry_sector,
            'qualifications' => $request->qualifications,
            'mentored_company' => $request->mentored_company,
            'functional_area' => $request->functional_area,
            'hear_about_us' => $request->hear_about_us,
            'number_of_companies' => $request->number_of_companies,

        ]);
        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
