<?php

namespace App\Http\Resources;

use App\Models\Flight;
use App\Models\Seat;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'flight' => new FlightResource(Flight::find($this->flight_id)),
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'seat' => new SeatResource(Seat::find($this->seat_id)),
        ];
    }
}
