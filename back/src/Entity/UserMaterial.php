<?php

namespace App\Entity;

use App\Repository\UserMaterialRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserMaterialRepository::class)]
class UserMaterial
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userMaterial')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Material $user_material = null;

    #[ORM\ManyToOne(inversedBy: 'userMaterial')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $details = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserMaterial(): ?Material
    {
        return $this->user_material;
    }

    public function setUserMaterial(?Material $user_material): static
    {
        $this->user_material = $user_material;

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
