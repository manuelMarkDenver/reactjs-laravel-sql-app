<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Task::factory()->count(50)->create();
    }

}
