<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Schedule;
use App\Models\SelectedSchedule;
use App\Models\User;
use App\Services\FileUpload;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class Main extends Controller
{
    public function register(Request $request)
    {

        return response([
            "message" => "Registration has ended"
        ], 403);

        $rider_name = $request->riderName;
        $rider_age = $request->riderAge;
        $federation_id = $request->federationId;
        $horse_name = $request->horseName;
        $pedigree = $request->pedigree;
        $horse_registration_number = $request->horseRegistrationNumber;
        $horse_document = $request->file('horseDocument');
        $schedules = $request->schedules;
        $user_id = Auth::user()->id;


        if (!empty($horse_document)) {
            $horse_document_url = FileUpload::upload_file($horse_document,  [
                "folder_name" => "horse_document/" . $horse_registration_number
            ]);
        } else {
            $horse_document_url = "";
        }

        $registration = Registration::create([
            "rider_name" => $rider_name,
            "rider_age" => $rider_age,
            "federation_id" => $federation_id,
            "horse_name" => $horse_name,
            "pedigree" => $pedigree ?? "",
            "horse_registration_number" =>  $horse_registration_number,
            "user_id" => $user_id,
            "horse_document" => $horse_document_url
        ]);

        $schedules = (explode(",", $schedules));
        foreach ($schedules as $scheduleId) {
            if (!empty($scheduleId) && $scheduleId != "null") {
                SelectedSchedule::create(
                    [
                        "registration_id" => $registration->id,
                        "schedule_id" => $scheduleId
                    ]
                );
            }
        }

        return response([
            "message" => "Registration successful"
        ], 200);
    }

    public function user_registration(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return response([
                "message" => "Invalid email format"
            ], 403);
        }

        $user = User::where('email', $request->email)->first();

        if (!empty($user)) {
            return response([
                "message" => "Email has already been taken (لقد اخذ الايميل من قبل)"
            ], 403);
        }

        User::create([
            'email' => $request->email,
            'password' => $request->password,
            'name' => $request->name,
            'role' => 'user',
            'sign_in_method' => 'email',
            'external_photo' => ""
        ]);

        return response([
            "message" => "Registration successful"
        ], 200);
    }

    public function user_login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (empty($user)) {
            return response([
                'message' => 'Email not found',
            ], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response([
                'message' => "Password incorrect!",
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;
        $user->token = $token;

        return response([
            "user" => $user
        ], 200);
    }

    public function verify_auth(Request $request)
    {

        $id_token = $request->idToken;

        $client = new Client();
        $api_response = $client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" . $id_token);
        $status = $api_response->getStatusCode();


        if ($status == 200) {
            $payload = json_decode($api_response->getBody()->getContents());

            $user = User::where('email', $payload->email)->first();

            if (empty($user)) {
                $user = User::create([
                    'name' => $payload->name,
                    'email' => $payload->email,
                    'external_photo' => $payload->picture,
                    'role' => 'user',
                    'password' => "google_sign_in",
                    'sign_in_method' => 'google'
                ]);
            }

            $token = $user->createToken('myapptoken')->plainTextToken;
            $user->token = $token;

            return response([
                "user" => $user
            ], 200);
        }

        return response($api_response, 500);
    }

    public function sign_out()
    {
        Auth::user()->tokens()->where('id', Auth::user()->id)->delete();
        return response(["message" => "Success"]);
    }

    public function list_registration(Request $request)
    {
        $searchKey = $request->query('searchKey');
        $registrationList = Registration::with('schedules')->with('user');

        if (!empty($searchKey)) {
            $registrationList->where(function ($query) use ($searchKey) {
                $query->where('rider_name', 'like', '%' . $searchKey . '%')
                    ->orWhere('federation_id', 'like', '%' . $searchKey . '%')
                    ->orWhere('horse_name', 'like', '%' . $searchKey . '%')
                    ->orWhere('horse_registration_number', 'like', '%' . $searchKey . '%');
            });
        }

        if (Auth::user()->role != "admin") {
            $registrationList->where('user_id', Auth::user()->id);
        }

        return response([
            "list" => $registrationList->latest()->get()
        ], 200);
    }

    public function admin_dashboard()
    {

        $number_of_horses = Registration::groupBy('horse_registration_number')
            ->select('horse_registration_number', DB::raw('count(*) as count'))
            ->get();

        $number_of_federations_registered = Registration::groupBy('federation_id')
            ->select('federation_id', DB::raw('count(*) as count'))
            ->get();

        $registrations_per_schedule = Schedule::withCount('registrations')->get();


        return response([
            "number_of_horses" => $number_of_horses,
            "number_of_federations_registered" => $number_of_federations_registered,
            "registrations_per_schedule" => $registrations_per_schedule,
        ], 200);
    }
}
