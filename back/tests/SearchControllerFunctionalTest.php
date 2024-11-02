<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class SearchControllerFunctionalTest extends WebTestCase
{
    private $client;
    private $token;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        
        $this->token = $this->getToken();
    }


    private function getToken(): string
    {
        $this->client->request('POST', '/authentication_token', [
            'json' => [
                'username' => '%env(USERNAME_TEST)%',
                'password' => '%env(PASSWORD_TEST)%',
            ]
        ]);
        // $this->client->request(
        //     'POST',
        //     '/authentication_token',
        //     ['_username' => '%env(USERNAME_TEST)%', '_password' => '%env(PASSWORD_TEST)%'],
        //     [],
        //     ['CONTENT_TYPE' => 'application/json']
        //  );

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);

        return $data['token'];
    }

    public function testSearchEndpoint()
    {
        $this->client->request(
            'POST',
            'http://localhost:8000/api/search',
            [],
            [],
            ['HTTP_AUTHORIZATION' => 'Bearer ' . $this->token],
            json_encode([
                'keyword' => '',
                'localisation' => [
                    'countrySelected' => ['label' => 'France'],
                    'citySelected' => ['label' => '']
                ],
                'activities' => [],
                'material' => []
            ])
        );

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);
        $this->assertNotEmpty($data['results']);
    }
}
