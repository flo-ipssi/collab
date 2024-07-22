<?php

namespace App\Entity;

use App\Repository\UserSkillRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserSkillRepository::class)]
class UserSkill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'UserSkill')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\ManyToOne(inversedBy: 'UserSkill')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Skill $skill_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $level = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getSkillId(): ?Skill
    {
        return $this->skill_id;
    }

    public function setSkillId(?Skill $skill_id): static
    {
        $this->skill_id = $skill_id;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(?string $level): static
    {
        $this->level = $level;

        return $this;
    }
}
