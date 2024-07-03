<?php

namespace App\Repository\Interface;
use Illuminate\Http\Request;
Interface MentorRepositoryInterface {
    /**
     * getData function return the data packet of job details
     * @param slug
     * @return array
    */
    public function getList();
    // public function saveData(Request $data);
}
