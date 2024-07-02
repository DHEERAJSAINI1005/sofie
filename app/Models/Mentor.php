<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'username',
        'password',
        'qualifications',
        'industry_sector',
        'mentored_compnay',
        'functional_area',
        'hear_about_us',
        'number_of_companies',
        'additional_information'
    ];
}
