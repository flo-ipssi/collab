<?php

namespace App\Entity;

use App\Repository\UserEquipmentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserEquipmentRepository::class)]
class UserEquipment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userEquipment')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Equipment $user_equipment = null;

    #[ORM\ManyToOne(inversedBy: 'userEquipment')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $details = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserEquipment(): ?Equipment
    {
        return $this->user_equipment;
    }

    public function setUserEquipment(?Equipment $user_equipment): static
    {
        $this->user_equipment = $user_equipment;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(?string $details): static
    {
        $this->details = $details;

        return $this;
    }
}
