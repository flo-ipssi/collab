<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProfileRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProfileRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write', 'user:put']],
    operations: [
       
    ]
)]
class Profile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'profile', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $bio = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $instagram = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $facebook = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $deezer = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $spotify = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $appleMusic = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tidal = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $customSite = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?User
    {
        return $this->user;
    }

    public function setUserId(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    public function setInstagram(?string $instagram): static
    {
        $this->instagram = $instagram;

        return $this;
    }

    public function getFacebook(): ?string
    {
        return $this->facebook;
    }

    public function setFacebook(?string $facebook): static
    {
        $this->facebook = $facebook;

        return $this;
    }

    public function getDeezer(): ?string
    {
        return $this->deezer;
    }

    public function setDeezer(?string $deezer): static
    {
        $this->deezer = $deezer;

        return $this;
    }

    public function getSpotify(): ?string
    {
        return $this->spotify;
    }

    public function setSpotify(?string $spotify): static
    {
        $this->spotify = $spotify;

        return $this;
    }

    public function getAppleMusic(): ?string
    {
        return $this->appleMusic;
    }

    public function setAppleMusic(?string $appleMusic): static
    {
        $this->appleMusic = $appleMusic;

        return $this;
    }

    public function getTidal(): ?string
    {
        return $this->tidal;
    }

    public function setTidal(?string $tidal): static
    {
        $this->tidal = $tidal;

        return $this;
    }

    public function getCustomSite(): ?string
    {
        return $this->customSite;
    }

    public function setCustomSite(?string $customSite): static
    {
        $this->customSite = $customSite;

        return $this;
    }
}
