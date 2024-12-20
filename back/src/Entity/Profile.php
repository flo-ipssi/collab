<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use App\Repository\ProfileRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProfileRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write', 'user:put']],
    operations: [
       new Patch()
    ]
)]
class Profile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'profile', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $bio = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $instagram = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $facebook = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $deezer = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $spotify = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $appleMusic = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tidal = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $customSite = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $twitter = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $youtube = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $publicIdAvatar = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private ?array $musicStyle = null;

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

    public function getTwitter(): ?string
    {
        return $this->twitter;
    }

    public function setTwitter(?string $twitter): static
    {
        $this->twitter = $twitter;

        return $this;
    }

    public function getYoutube(): ?string
    {
        return $this->youtube;
    }

    public function setYoutube(string $youtube): static
    {
        $this->youtube = $youtube;

        return $this;
    }

    public function getPublicIdAvatar(): ?string
    {
        return $this->publicIdAvatar;
    }

    public function setPublicIdAvatar(?string $publicIdAvatar): static
    {
        $this->publicIdAvatar = $publicIdAvatar;

        return $this;
    }

    public function getMusicStyle(): ?array
    {
        return $this->musicStyle;
    }

    public function setMusicStyle(?array $musicStyle): static
    {
        $this->musicStyle = $musicStyle;

        return $this;
    }
}
