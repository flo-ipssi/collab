<?php

namespace App\Controller;

use App\Repository\MaterialRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MaterialController extends AbstractController
{
    #[Route('/api/material/{id}/brands', name: 'material_brands', methods: ['GET'])]
    public function getDistinctBrands(int $id, MaterialRepository $materialRepository): JsonResponse
    {
        $brands = $materialRepository->findDistinctBrands($id);
        return $this->json($brands);
    }
}
