<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\ApiFilter;
use App\Repository\EquipmentRepository;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EquipmentRepository::class)]
#[ApiResource(
    // normalizationContext: ['groups' => ['equipment:list','equipment:read']],
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['equipment:list','equipment:read', ]]
        ),
        new Get(),
        new Post(),
        new Put(),
        new Delete() 
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['model' => 'partial', 'brand' => 'exact'])]
class Equipment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['equipment:read', 'equipment:list'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['equipment:read', 'equipment:list','material:list',])]
    private ?string $brand = null;

    #[ORM\Column(length: 255)]
    #[Groups(['equipment:read', 'equipment:list'])]
    private ?string $model = null;

    #[ORM\ManyToOne(inversedBy: 'equipment')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['equipment:read', 'equipment:list'])]
    private ?Material $material = null;


    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getMaterial(): ?Material
    {
        return $this->material;
    }

    public function setMaterial(?Material $material): static
    {
        $this->material = $material;

        return $this;
    }
}
