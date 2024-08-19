<?php

namespace App\Http\Controllers;

use App\Models\FlightReservation;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class FlightsController extends Controller
{
    //
    public function storeFlights(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'tripId' => 'required|integer',
                'userId' => 'required|integer',
                'flights' => 'required|array',
                'flights.*.airportId' => 'required|integer',
                'flights.*.numOfTickets' => 'required|integer',
                'flights.*.ticketPrice' => 'required|numeric',
                'flights.*.date' => 'required|string',
                'creditCardInfo.cardNumber' => 'required|numeric',
                'creditCardInfo.cvv' => 'required|integer',
                'creditCardInfo.name' => 'required|string',
            ]);

            // Loop through each flight reservation and store it
            foreach ($request->flights as $flight) {
                FlightReservation::create([
                    'user_id' => $request['userId'],
                    'trip_id' => $request['tripId'],
                    'to_airport' => $flight['airportId'],
                    'credit_card_number' => $request['creditCardInfo']['cardNumber'],
                    'name_on_card' => $request['creditCardInfo']['name'],
                    'paid_amount' => $flight['numOfTickets'] * $flight['ticketPrice'],
                    'date' => $flight['date'],
                    'number_of_tickets' => $flight['numOfTickets'],
                    'ticket_price' => $flight['ticketPrice'],
                    'cvv' => $request['creditCardInfo']['cvv'],
                ]);
            }

            // Return a success response
            return response()->json(
                ['message' => 'Flight reservations stored successfully'],
                Response::HTTP_OK
            );
        } catch (\Exception $e) {
            // Handle any exceptions (e.g., database errors)
            return response()->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
