<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Http\Resources\SeatResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeatController extends Controller
{
    public function index()
    {
        $seats = Seat::all();
        return SeatResource::collection($seats);
    }

    public function show($id)
    {
        $seat = Seat::findOrFail($id);
        return new SeatResource($seat);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,id',
            'seat_number' => 'required|string|max:255|unique:seats',
            'description' => 'sometimes|nullable|string',
            'is_locked' => 'required|boolean',
            'locked_at' => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $seat = Seat::create($validator->validated());
        return new SeatResource($seat);
    }

    public function update(Request $request, $id)
    {
        $seat = Seat::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'flight_id' => 'sometimes|required|exists:flights,id',
            'seat_number' => 'sometimes|required|string|max:255|unique:seats,seat_number,' . $seat->id,
            'description' => 'sometimes|nullable|string',
            'is_locked' => 'sometimes|required|boolean',
            'locked_at' => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $seat->update($validator->validated());
        return new SeatResource($seat);
    }

    public function destroy($id)
    {
        $seat = Seat::findOrFail($id);
        $seat->delete();

        return response()->json(['message' => 'Seat deleted successfully']);
    }
}
