<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $docentes = Docente::all();
        return $docentes;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //return "Aquí se registran los docentes";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $codigoSis = strtolower($request->codigoSis);
      $geBusc = Docente::where('codigoSis','=',$codigoSis)->first();
      if(isset($geBusc)){
        return response()->json([
          "message"=>"Ya existe un docente con el mismo código Sis"
        ]);
      }
      else{
        $docente = new Docente();
        $docente->codigoSis = $codigoSis;
        $docente->nombre = $request->nombre;
        $docente->apellido= $request->apellido;
        $docente->cedula = $request->cedula;
        $docente->facultad = $request->facultad;
        $docente->departamento = $request->departamento;
        $docente->celular = $request->celular;
        $docente->telefono = $request->telefono;
        $docente->correo = $request->correo;
        $docente->save();
        return response()->json([
          "message" => "Se ha creado una nueva cuenta de docente"
        ]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Docente::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(Docente::all(),200);
    }
}
