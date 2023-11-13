<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    public function registrations()
    {
        return $this->hasMany('App\Models\SelectedSchedule', 'schedule_id', 'id');
    }
}
