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
        // if (!$request->isXmlHttpRequest()) {
        //     return new JsonResponse("Not an HTTP requests");
        // } 
        $queryString = new QueryString();
        // Use `*` for partial matches
        $queryString->setQuery('*' . $keyword . '*'); 
        $queryString->setFields(['username']); 

        $results = $this->finder->createPaginatorAdapter($queryString);
        $pagination = $this->paginator->paginate($results, $page);

        $data = $this->serializer->serialize($pagination->getItems(), 'json', ['groups' => 'user:read']);

        return new JsonResponse([
            'pagination' => json_decode($data, true) ?? [],
            // 'total' => $results->getNbResults(),
        ]);
    }
}
