<!DOCTYPE html>
<html>
<head>
    <title>Ticket PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo {
            width: 100px;
        }
        .ticket-details {
            margin-top: 30px;
        }
        .ticket-details p {
            margin: 5px 0;
        }
        .barcode {
            margin-top: 20px;
            text-align: center;
        }
        .footer {
            position: fixed;
            bottom: 10px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/plane.jpg') }}" class="logo" alt="Logo">
        <h2>Ticket Details</h2>
        <p>{{ \Carbon\Carbon::now()->toFormattedDateString() }}</p>
    </div>

    <div class="ticket-details">
        <p><strong>Passenger Name:</strong> {{ $ticket->reservation->user->name }}</p>
        <p><strong>Flight Number:</strong> {{ $ticket->reservation->flight->flight_number }}</p>
        <p><strong>Departure City:</strong> {{ $ticket->reservation->flight->departure_city }}</p>
        <p><strong>Arrival City:</strong> {{ $ticket->reservation->flight->arrival_city }}</p>
        <p><strong>Departure Time:</strong> {{ $ticket->reservation->flight->departure_time }}</p>
        <p><strong>Arrival Time:</strong> {{ $ticket->reservation->flight->arrival_time }}</p>
        <p><strong>Seat Number:</strong> {{ $ticket->reservation->seat->seat_number }}</p>
        <p><strong>Price:</strong> ${{ $ticket->price }}</p>
    </div>

    <div class="barcode">
        {!! DNS1D::getBarcodeHTML($ticket->id, 'C39') !!}
        <p>Ticket ID: {{ $ticket->id }}</p>
    </div>

    <div class="footer">
        This is a computer-generated document. No signature is required.
    </div>
</body>
</html>
