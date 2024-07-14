<?php
namespace App\Http\Controllers;

use App\Models\Flight;
use App\Http\Resources\FlightResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlightController extends Controller
{
    public function index()
    {
        $flights = Flight::all();
        return FlightResource::collection($flights);
    }

    public function show($id)
    {
        $flight = Flight::findOrFail($id);
        return new FlightResource($flight);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_number' => 'required|string|max:255|unique:flights',
            'departure_city' => 'required|string|max:255',
            'arrival_city' => 'required|string|max:255',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'price' => 'required|numeric',
            'total_seats' => 'required|integer',
            'reserved_seats' => 'required|integer|gte:0|lte:total_seats',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $flight = Flight::create($validator->validated());
        return new FlightResource($flight);
    }

    public function update(Request $request, $id)
    {


        $flight = Flight::findOrFail($id);
        
       
        $validator = Validator::make($request->all(), [
            'flight_number' => 'sometimes|required|string|max:255|unique:flights,flight_number,' . $flight->id,
            'departure_city' => 'sometimes|required|string|max:255',
            'arrival_city' => 'sometimes|required|string|max:255',
            'departure_time' => 'sometimes|required|date',
            'arrival_time' => 'sometimes|required|date|after:departure_time',
            'price' => 'sometimes|required|numeric',
            'total_seats' => 'sometimes|required|integer',
            'reserved_seats' => 'sometimes|required|integer|gte:0|lte:total_seats',
            'version' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        if ($flight->version != $request->input('version')) {
            return response()->json(['error' => 'Resource has been modified'], 409);
        }
        
        /*Metoda performUpdate se od strane Eloquent-a svaki put kada se koristi metoda update 
        znaci svaki put kad pozovem $flight->update(), Laravel će pozvati performUpdate pre nego 
        što izvrsi update u bazi */


        $flight->update($validator->validated());
        return new FlightResource($flight);
    }
    

    public function destroy($id)
    {
        $flight = Flight::findOrFail($id);
        $flight->delete();

        return response()->json(['message' => 'Flight deleted successfully']);
    }
}
