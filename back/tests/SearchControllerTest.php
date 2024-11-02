<?php

namespace App\Tests;

use App\Controller\SearchController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use FOS\ElasticaBundle\Finder\PaginatedFinderInterface;
use Knp\Component\Pager\PaginatorInterface;


class SearchControllerTest extends WebTestCase
{
    private SearchController $controller;
    private $finderMock;
    private $paginatorMock;
    private $serializerMock;

    protected function setUp(): void
    {
        $this->finderMock = $this->createMock(PaginatedFinderInterface::class);
        $this->paginatorMock = $this->createMock(PaginatorInterface::class);
        $this->serializerMock = $this->createMock(SerializerInterface::class);

        $this->controller = new SearchController(
            $this->paginatorMock,
            $this->finderMock,
            $this->serializerMock
        );
    }

    public function testSearchWithoutFilters(): void
    {
        $request = new Request([], [], [], [], [], [], json_encode(['keyword' => 'test']));

        $this->finderMock->method('createPaginatorAdapter')
            ->willReturn($this->createMock(\Knp\Component\Pager\Pagination\PaginationInterface::class));

        $response = $this->controller->search($request);
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
    }

    
    // public function testSomething(): void
    // {
    //     $client = static::createClient();
    //     $crawler = $client->request('GET', '/');

    //     $this->assertResponseIsSuccessful();
    //     $this->assertSelectorTextContains('h1', 'Hello World');
    // }

}
