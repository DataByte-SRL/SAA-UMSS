<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;

    protected $table = 'aula';
    //protected $hidden = ['created_at', updated_at];
    protected $fillable = ['id', 'facultad', 'nombreAula', 'capacidad', 'detalle', 'proyector'];
}
