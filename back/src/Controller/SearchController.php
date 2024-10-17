<?php

namespace App\Controller;

use Elastica\Query\QueryString;
use FOS\ElasticaBundle\Finder\PaginatedFinderInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SearchController
{

    public function __construct(
        private readonly PaginatorInterface $paginator,
        private PaginatedFinderInterface $finder,
        private SerializerInterface $serializer
    ) {}

    #[Route('/api/search/{keyword}/{page}', name: 'search', methods: ['GET'])]
    public function search(Request $request, string $keyword, int $page = 1)
    {
        $queryString = new QueryString();

        $queryString->setQuery('*' . $keyword . '*');
        $queryString->setFields(['username']);
        // $queryString->setFields(['username', 'country', 'city', 'zip_code', 'profile.bio']); 

        $results = $this->finder->createPaginatorAdapter($queryString);
        $pagination = $this->paginator->paginate($results, $page);

        $data = $this->serializer->serialize($pagination->getItems(), 'json', ['groups' => 'user:read']);

        return new JsonResponse([
            "results" => json_decode($data, true) ?? [],
            'total' => count(json_decode($data, true)) ?? 0,
        ]);
    }
}
