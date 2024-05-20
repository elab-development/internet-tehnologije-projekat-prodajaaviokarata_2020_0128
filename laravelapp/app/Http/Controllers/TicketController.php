<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Resources\TicketResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PDF; 
class TicketController extends Controller
{
    public function index()
    {
       // Dohvati karte koje pripadaju ulogovanom korisniku
       $tickets = Ticket::whereHas('reservation', function($query) {
            $query->where('user_id', Auth::id());
        })->get();

        return TicketResource::collection($tickets);
    }

    public function show($id)
    {
        $ticket = Ticket::findOrFail($id);
        return new TicketResource($ticket);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reservation_id' => 'required|exists:reservations,id',
            'flight_id' => 'required|exists:flights,id',
            'seat_number' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ticket = Ticket::create($validator->validated());
        return new TicketResource($ticket);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'reservation_id' => 'sometimes|required|exists:reservations,id',
            'flight_id' => 'sometimes|required|exists:flights,id',
            'seat_number' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ticket->update($validator->validated());
        return new TicketResource($ticket);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }
    public function downloadPdf($id)
    {
        // Pronađi kartu sa svim potrebnim relacijama
        $ticket = Ticket::with('reservation.user', 'flight')->findOrFail($id);

        // Proveri da li je ulogovani korisnik isti kao korisnik povezan sa rezervacijom
        if (Auth::id() !== $ticket->reservation->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Generiši PDF
        $pdf = PDF::loadView('tickets.pdf', compact('ticket'));

        // Vrati preuzimanje PDF-a
        return $pdf->download('ticket.pdf');
    }
}

 
