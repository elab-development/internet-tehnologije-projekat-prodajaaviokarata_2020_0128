<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FlightResource extends JsonResource
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
            'flight_number' => $this->flight_number,
            'departure_city' => $this->departure_city,
            'arrival_city' => $this->arrival_city,
            'departure_time' => $this->departure_time,
            'arrival_time' => $this->arrival_time,
            'price' => $this->price,
            'total_seats' => $this->total_seats,
            'reserved_seats' => $this->reserved_seats,
            'version' => $this->version, 
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at, 
        ];
    }
}
