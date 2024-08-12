<?php

namespace App\Controller;

use Elastica\Query\BoolQuery;
use Elastica\Query\MatchPhrase;
use Elastica\Query\MatchQuery;
use FOS\ElasticaBundle\Finder\PaginatedFinderInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class SearchController
{

    public function __construct(
        private readonly PaginatorInterface $paginator,
        private PaginatedFinderInterface $finder
    ) {
    }

    #[Route('/api/search/{keyword}/{page}', name: 'search', methods: ['GET'])]
    public function search(Request $request, string $keyword, int $page = 1)
    {
        // if (!$request->isXmlHttpRequest()) {
        //     return new JsonResponse("Not an HTTP requests");
        // }

        $boolQuery = new BoolQuery();
        $boolQuery->addMust(new MatchQuery('username', $keyword));

        $results = $this->finder->createPaginatorAdapter($boolQuery);
        $pagination = $this->paginator->paginate($results, $page);

        return new JsonResponse([
            'pagination' => $pagination ?? [],
            // 'total' => $results->getNbResults(),
        ]);
    }
}
