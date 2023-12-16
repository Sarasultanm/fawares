<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $table = 'registration';

    protected $fillable = [
        'rider_name',
        'rider_age',
        'federation_id',
        'horse_name',
        'pedigree',
        'horse_registration_number',
        'horse_document',
        'user_id',
    ];

    public function schedules()
    {
        return $this->hasMany('App\Models\SelectedSchedule', 'registration_id', 'id');
    }

    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }
}
