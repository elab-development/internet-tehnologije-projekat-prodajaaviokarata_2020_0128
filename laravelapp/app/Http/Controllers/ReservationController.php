<?php
namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Seat;
use App\Http\Resources\ReservationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,id',
            'status' => 'required|string|max:255',
            'seat_id' => 'required|exists:seats,id',
            'number_of_tickets' => 'required|integer|min:1', // Izmenjeno ovde
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $flightId = $request->flight_id;
        $seatId = $request->seat_id;
        $numberOfTickets = $request->number_of_tickets;

        DB::beginTransaction();

        try {
            // Update the seat to lock it
            $seat = Seat::where('id', $seatId)->lockForUpdate()->first();
            if ($seat->is_locked) {
                return response()->json(['message' => 'Seat is already locked'], 422);
            }
            $seat->is_locked = true;
            $seat->locked_at = now();
            $seat->save();

            // Create the reservation
            $reservation = Reservation::create([
                'user_id' => Auth::id(),
                'flight_id' => $flightId,
                'status' => $request->status,
            ]);

          

            DB::commit();
            return new ReservationResource($reservation);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Reservation failed', 'error' => $e->getMessage()], 500);
        }
    }
}
