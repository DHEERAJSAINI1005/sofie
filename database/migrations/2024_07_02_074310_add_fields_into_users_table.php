<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->string('role')->nullable();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->string('qualifications')->nullable();
            $table->string('industry_sector')->nullable();
            $table->string('mentored_compnay')->nullable();
            $table->string('functional_area')->nullable();
            $table->string('hear_about_us')->nullable();
            $table->string('number_of_companies')->nullable();
            $table->string('additional_information')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'role','username','password','qualifications','industry_sector','mentored_compnay','functional_area','hear_about_us','number_of_companies','additional_information']);
        });
    }
};
