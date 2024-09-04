<?php
namespace App\Service;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    private $cloudinary;

    public function __construct(string $cloudName, string $apiKey, string $apiSecret)
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => $cloudName,
                'api_key' => $apiKey,
                'api_secret' => $apiSecret,
            ],
        ]);
    }

    public function upload($filePath, $options = [])
    {
        return $this->cloudinary->uploadApi()->upload($filePath, $options);
    }
}