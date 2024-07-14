<?php
namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Seat;
use App\Models\Flight;
use App\Http\Resources\ReservationResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('user', 'flight')->get();
        return ReservationResource::collection($reservations);
    }
    




    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,id',
            'status' => 'required|string|max:255',
            'seat_id' => 'required|exists:seats,id',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $flightId = $request->flight_id;
        $seatId = $request->seat_id;
        $numberOfTickets = 1;

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
                'seat_id' => $request->seat_id,
            ]);

            $flight = Flight::findOrFail($flightId);
            $flight->reserved_seats = $flight->reserved_seats + 1;
            $flight->save(); 

            DB::commit();
            return new ReservationResource($reservation);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Reservation failed', 'error' => $e->getMessage()], 500);
        }
    }
    public function approve($id)
    {
        $reservation = Reservation::findOrFail($id);

        DB::beginTransaction();

        try {
            $reservation->status = 'confirmed';
            $reservation->save();
            $flight = $reservation->flight;
            $flightPrice = $flight->price;
            $seat=$reservation->seat;

            $ticketData = [
                'reservation_id' => $reservation->id,
                'flight_id' => $reservation->flight_id,
                'price' =>   $flightPrice,
                'seat_number' =>$seat->seat_number,

            ];
  

            Ticket::create($ticketData);

            DB::commit();
            return new ReservationResource($reservation);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Approval failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function reject($id)
    {
        $reservation = Reservation::findOrFail($id);

        DB::beginTransaction();

        try {
            $seat= $reservation->seat;
            
                if ($seat) {
                    $seat->is_locked = false;
                    $seat->locked_at = null;
                    $seat->save();
                }
        
            $reservation->delete();

            $flight = Flight::findOrFail($reservation->flight_id);
            $flight->reserved_seats = $flight->reserved_seats - 1;
            $flight->save(); 
    
            DB::commit();
            return response()->json(['message' => 'Reservation rejected and seat unlocked']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Rejection failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function statistics()
    {
        // Broj rezervacija po letu
        $reservationsByFlight = Reservation::select(DB::raw('flight_id, count(*) as total'))
            ->groupBy('flight_id')
            ->with('flight')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->flight->flight_number => $item->total];
            });
    
        // Status rezervacija
        $reservationStatuses = Reservation::select(DB::raw('status, count(*) as total'))
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->total];
            });
    
        return response()->json([
            'reservationsByFlight' => $reservationsByFlight,
            'reservationStatuses' => $reservationStatuses
        ]);
    }
    







}
