<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\HotelReservation;

class HotelsController extends Controller
{
    public function getHotelReservations(Request $request)
    {
        try {
            $request->validate([
                'userId' => 'required|integer',
            ]);

            // Retrieve hotel reservations for the specified user along with hotel information
            $userReservations = HotelReservation::with('hotel')
                ->where('user_id', $request['userId'])
                ->get();

            // Return the reservations and associated hotel data as a JSON response
            return response()->json($userReservations, Response::HTTP_OK);
        } catch (\Exception $e) {
            // Handle any exceptions (e.g., database errors)
            return response()->json(
                ['error' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }


    public function storeHotelsReservations(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'tripId' => 'required|integer',
                'userId' => 'required|integer',
                'hotels' => 'required|array',
                'hotels.*.hotelId' => 'required|integer',
                'hotels.*.paidAmount' => 'required|integer',
                'hotels.*.date' => 'required|string',
                'creditCardInfo.cardNumber' => 'required|numeric',
                'creditCardInfo.cvv' => 'required|integer',
                'creditCardInfo.name' => 'required|string',
            ]);

            // Loop through each flight reservation and store it
            foreach ($request->hotels as $hotel) {
                HotelReservation::create([
                    'user_id' => $request['userId'],
                    'trip_id' => $request['tripId'],
                    'hotel_id' => $hotel['hotelId'],
                    'credit_card_number' => $request['creditCardInfo']['cardNumber'],
                    'name_on_card' => $request['creditCardInfo']['name'],
                    'paid_amount' => $hotel['paidAmount'],
                    'date' => $hotel['date'],
                    'cvv' => $request['creditCardInfo']['cvv'],
                ]);
            }

            // Return a success response
            return response()->json(
                ['message' => 'hotels reservations stored successfully'],
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
