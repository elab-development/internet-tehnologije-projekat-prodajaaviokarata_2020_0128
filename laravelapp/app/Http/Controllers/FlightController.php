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

        /*
        Sistem proverava da li se verzija modela u memoriji poklapa sa verzijom u bazi.
        Ako se verzije poklapaju, ažuriranje se izvršava i verzija u bazi se povećava.
        Ako se verzije ne poklapaju, što znači da je neko drugi već ažurirao zapis, ažuriranje se neće izvršiti i metoda će vratiti grešku.
        */

        $flight = Flight::findOrFail($id);
        
        //Kada koristite sometimes, znači da će se pravila validacije za to polje primeniti samo ako je polje prisutno u dolaznim podacima.
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
        
        /*Metoda performUpdate se poziva interno od strane Eloquent-a svaki put kada se koristi metoda update na modelu. 
        To znači da svaki put kada pozovete $flight->update(), Laravel će pozvati performUpdate metodu vašeg modela pre nego 
        što izvrši stvarno ažuriranje u bazi. */


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
