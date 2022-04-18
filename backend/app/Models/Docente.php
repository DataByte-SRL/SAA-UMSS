<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $table = 'docente';
    //protected $hidden = ['created_at', updated_at];
    protected $fillable = ['id', 'codigoSis', 'nombre', 'apellido', 'cedula', 'facultad', 'departamento', 'celular', 'telefono', 'correo'];
}
