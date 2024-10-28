<?php

namespace App\Controller;

use Elastica\Query\BoolQuery;
use Elastica\Query\MultiMatch;
use Elastica\Query\Nested;
use Elastica\Query\MatchAll;
use Elastica\Query\QueryString;
use Elastica\Query\Term;
use Elastica\Query\Terms;
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

    #[Route('/api/search', name: 'search', methods: ['POST'])]
    public function search(Request $request, int $page = 1)
    {
        // Extraction des paramètres de la requête
        $data = json_decode($request->getContent(), true);
        $keyword = $data['keyword'] ?? null;
        $page = $data['page'] ?? 1;
        $country = $data['localisation']['countrySelected']['label'] ?? null;
        $city = $data['localisation']['citySelected']['label'] ?? null;
        $selectedMaterial = $data['material'] ?? null;
        $selectedActivities = $data['activities'] ?? [];
        $selectedStyles = $data['musicStyles'] ?? [];

        $boolQuery = new BoolQuery();
        if ($keyword) {
            $multiMatch = new MultiMatch();
            $multiMatch->setQuery($keyword)
                ->setFields(['username', 'profile.bio', 'userEquipment.equipment.model'])
                ->setType('phrase_prefix');
            $boolQuery->addMust($multiMatch);
        }

        //     $queryString = new QueryString();

        //     $queryString->setQuery('*' . $keyword . '*')
        //         ->setFields(['username', 'profile.bio', 'userEquipment.equipment.model']);
        //     $boolQuery->addFilter($queryString);
        // }

        if ($country) {
            // var_dump($country);
            $countryTerm = new Term();
            $countryTerm->setTerm('country.raw', $country);
            $boolQuery->addFilter($countryTerm);
            // $queryString = new QueryString();

            // $queryString->setQuery('*' . $country . '*');
            // $queryString->setFields(['country']);
            // $boolQuery->addFilter($queryString);
        }

        if ($city) {
            // var_dump($city);
            // $cityTerm = new Term();
            // $cityTerm->setTerm('city', $city);
            // $boolQuery->addFilter($cityTerm);

            $cityTerm = new Term();
            $cityTerm->setTerm('city.raw', $city);
            $boolQuery->addFilter($cityTerm);
        }

        if ($selectedMaterial) {
            $materialTerm = new Term();
            $materialTerm->setTerm('userEquipment.equipment.material.id', $selectedMaterial);
            $boolQuery->addFilter($materialTerm);
        }

        if (!empty($selectedActivities)) {
            $nestedQuery = new Nested();
            $nestedQuery->setPath('userProfession')
                ->setQuery(
                    (new BoolQuery())->addMust(
                        new Terms('userProfession.profession.id', $selectedActivities)
                    )
                );
            $boolQuery->addFilter($nestedQuery);
        }

        if (!empty($selectedStyles)) {
            $musicStylesTerms = new Terms('profile.musicStyles', $selectedStyles);
            $boolQuery->addFilter($musicStylesTerms);
        }

        $results = $this->finder->createPaginatorAdapter($boolQuery);
        $pagination = $this->paginator->paginate($results, $page);

        $responseData = $this->serializer->serialize($pagination->getItems(), 'json', ['groups' => 'user:read']);

        return new JsonResponse([
            'results' => json_decode($responseData, true) ?? [],
            'total' => $pagination->getTotalItemCount(),
        ]);
    }
}
