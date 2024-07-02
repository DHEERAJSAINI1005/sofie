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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('company_uen')->nullable();
            $table->string('phone')->nullable();
            $table->string('position')->nullable();
            $table->string('username')->nullable();
            $table->string('password')->nullable();
            $table->string('founded_year')->nullable();
            $table->string('team_size')->nullable();
            $table->string('current_revenue')->nullable();
            $table->string('current_customers_base_size')->nullable();
            $table->string('industry_sector')->nullable();
            $table->string('description')->nullable();
            $table->string('function_area_1')->nullable();
            $table->string('function_area_2')->nullable();
            $table->string('function_area_3')->nullable();
            $table->string('hear_about_us')->nullable();
            $table->string('current_problem')->nullable();
            $table->string('additional_information')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
