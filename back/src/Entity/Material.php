<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Get;
use App\Repository\MaterialRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MaterialRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['material:read']],
    operations: [
        new GetCollection(),
        new Get(),
    ]
)]

#[ApiFilter(SearchFilter::class, properties: [
    'name' => 'partial',
    'equipment.brand' => 'exact',
    'equipment.model' => 'exact',
])]
class Material
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['material:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['material:read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['material:read'])]
    private ?string $description = null;

    /**
     * @var Collection<int, UserEquipment>
     */
    #[ORM\OneToMany(targetEntity: UserEquipment::class, mappedBy: 'user_material')]
    private Collection $userEquipment;

    /**
     * @var Collection<int, Equipment>
     */
    #[ORM\OneToMany(targetEntity: Equipment::class, mappedBy: 'material', orphanRemoval: true)]
    #[Groups(['material:read'])]
    private Collection $equipment;

    public function __construct()
    {
        $this->userEquipment = new ArrayCollection();
        $this->equipment = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, UserEquipment>
     */
    public function getUserEquipment(): Collection
    {
        return $this->userEquipment;
    }

    public function addUserEquipment(UserEquipment $userEquipment): static
    {
        if (!$this->userEquipment->contains($userEquipment)) {
            $this->userEquipment->add($userEquipment);
            $userEquipment->setUserEquipment($this);
        }

        return $this;
    }

    public function removeUserEquipment(UserEquipment $userEquipment): static
    {
        if ($this->userEquipment->removeElement($userEquipment)) {
            // set the owning side to null (unless already changed)
            if ($userEquipment->getUserEquipment() === $this) {
                $userEquipment->setUserEquipment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Equipment>
     */
    public function getEquipment(): Collection
    {
        return $this->equipment;
    }

    public function addEquipment(Equipment $equipment): static
    {
        if (!$this->equipment->contains($equipment)) {
            $this->equipment->add($equipment);
            $equipment->setMaterial($this);
        }

        return $this;
    }

    public function removeEquipment(Equipment $equipment): static
    {
        if ($this->equipment->removeElement($equipment)) {
            // set the owning side to null (unless already changed)
            if ($equipment->getMaterial() === $this) {
                $equipment->setMaterial(null);
            }
        }

        return $this;
    }
}
