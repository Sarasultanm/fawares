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

class Main extends Controller
{
    public function register(Request $request)
    {

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
            SelectedSchedule::create(
                [
                    "registration_id" => $registration->id,
                    "schedule_id" => $scheduleId
                ]
            );
        }

        return response([
            "message" => "Registration successful"
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
                    'password' => "google_sign_in",
                    'external_photo' => $payload->picture
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
        $registrationList = Registration::with('schedules');

        if (!empty($searchKey)) {
            $registrationList->where(function ($query) use ($searchKey) {
                $query->where('rider_name', 'like', '%' . $searchKey . '%')
                    ->orWhere('federation_id', 'like', '%' . $searchKey . '%')
                    ->orWhere('horse_name', 'like', '%' . $searchKey . '%')
                    ->orWhere('horse_registration_number', 'like', '%' . $searchKey . '%');
            })->latest()->take(10);
        }

        return response([
            "list" => $registrationList->get()
        ], 200);
    }
}



// {
// 	"data": {
// 		"iss": "https://accounts.google.com",
// 		"azp": "935886178153-1rpj4n5mt29nnqthvuphanefimucg3pr.apps.googleusercontent.com",
// 		"aud": "935886178153-1rpj4n5mt29nnqthvuphanefimucg3pr.apps.googleusercontent.com",
// 		"sub": "103397957621680338397",
// 		"hd": "awalalmasar.com",
// 		"email": "g.dayak@awalalmasar.com",
// 		"email_verified": "true",
// 		"nbf": "1699010547",
// 		"name": "Gerald Dayak",
// 		"picture": "https://lh3.googleusercontent.com/a/ACg8ocIoDAt4valu5k1BJ3YvD9hdzmkbBvZJqCorOS8kRU_-=s96-c",
// 		"given_name": "Gerald",
// 		"family_name": "Dayak",
// 		"locale": "en",
// 		"iat": "1699010847",
// 		"exp": "1699014447",
// 		"jti": "4964ae4322ed755729d9bee408dfd95b6f04f255",
// 		"alg": "RS256",
// 		"kid": "f5f4bf46e52b31d9b6249f7309ad0338400680cd",
// 		"typ": "JWT"
// 	}
// }