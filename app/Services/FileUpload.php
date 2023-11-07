<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;



class FileUpload
{
    public static function upload_file($file_payload, $data)
    {
        $file_payload->store($data['folder_name'], 's3');
        return env('AWS_URL') . "/" . $data['folder_name'] . "/" . $file_payload->hashName();
    }
}
