<?php

namespace App\Entity;

use App\Repository\EquipmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EquipmentRepository::class)]
class Equipment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    /**
     * @var Collection<int, UserEquipment>
     */
    #[ORM\OneToMany(targetEntity: UserEquipment::class, mappedBy: 'user_equipment')]
    private Collection $userEquipment;

    public function __construct()
    {
        $this->userEquipment = new ArrayCollection();
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
}
