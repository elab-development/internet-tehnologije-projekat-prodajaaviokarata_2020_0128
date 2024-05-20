<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Resources\ReservationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return ReservationResource::collection($reservations);
    }

    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return new ReservationResource($reservation);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,id',
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $reservation = Reservation::create([
            'user_id' => Auth::id(), // ID ulogovanog korisnika
            'flight_id' => $validator->validated()['flight_id'],
            'status' => $validator->validated()['status'],
        ]);

        return new ReservationResource($reservation);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'flight_id' => 'sometimes|required|exists:flights,id',
            'status' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $reservation->update($validator->validated());
        return new ReservationResource($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        // Proveravamo da li je ulogovani korisnik vlasnik rezervacije
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Proveravamo da li je let u budućnosti
        if ($reservation->flight->departure_time <= now()) {
            return response()->json(['message' => 'Cannot delete reservation for past flights'], 403);
        }

        // Brišemo rezervaciju
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
