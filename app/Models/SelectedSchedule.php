<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedSchedule extends Model
{
    use HasFactory;

    protected $table = 'selected_schedule';

    protected $appends = ['sched_data'];

    public function getSchedDataAttribute()
    {
        return Schedule::where('id', $this->schedule_id)->first();
    }


    protected $fillable = [
        'registration_id',
        'schedule_id',
    ];
}
