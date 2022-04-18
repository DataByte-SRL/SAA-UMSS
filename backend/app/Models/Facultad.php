<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    use HasFactory;

    protected $table = 'facultad';
    //protected $hidden = ['created_at', updated_at];
    protected $fillable = ['id', 'nombreFacultad'];
}
