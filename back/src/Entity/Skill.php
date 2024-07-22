<?php

namespace App\Entity;

use App\Repository\SkillRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
class Skill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'skills')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SkillArea $skill_area = null;

    /**
     * @var Collection<int, UserSkill>
     */
    #[ORM\OneToMany(targetEntity: UserSkill::class, mappedBy: 'skill_id')]
    private Collection $UserSkill;

    public function __construct()
    {
        $this->UserSkill = new ArrayCollection();
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

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSkillArea(): ?SkillArea
    {
        return $this->skill_area;
    }

    public function setSkillArea(?SkillArea $skill_area): static
    {
        $this->skill_area = $skill_area;

        return $this;
    }

    /**
     * @return Collection<int, UserSkill>
     */
    public function getUserSkill(): Collection
    {
        return $this->UserSkill;
    }

    public function addUserSkill(UserSkill $userSkill): static
    {
        if (!$this->UserSkill->contains($userSkill)) {
            $this->UserSkill->add($userSkill);
            $userSkill->setSkillId($this);
        }

        return $this;
    }

    public function removeUserSkill(UserSkill $userSkill): static
    {
        if ($this->UserSkill->removeElement($userSkill)) {
            // set the owning side to null (unless already changed)
            if ($userSkill->getSkillId() === $this) {
                $userSkill->setSkillId(null);
            }
        }

        return $this;
    }
}
