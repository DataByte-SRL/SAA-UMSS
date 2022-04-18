<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $table = 'departamento';
    //protected $hidden = ['created_at', updated_at];
    protected $fillable = ['id', 'nombreDepartamento'];
}
}
