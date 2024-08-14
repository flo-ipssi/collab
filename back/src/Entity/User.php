<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]

#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
#[UniqueEntity(fields: ['username'], message: 'It looks like another dragon took your username. ROAR!')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 180)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[Groups(['user:write'])]
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, unique:true)]
    #[Assert\NotBlank]
    private ?string $username = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255)]
    private ?string $country = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255)]
    private ?string $zip_code = null;

    #[Groups(['user:read'])]
    #[ORM\OneToOne(mappedBy: 'user_id', cascade: ['persist', 'remove'])]
    private ?Profile $profile = null;

    /**
     * @var Collection<int, UserSkill>
     */
    #[ORM\OneToMany(targetEntity: UserSkill::class, mappedBy: 'user_id', orphanRemoval: true)]
    private Collection $UserSkill;

    /**
     * @var Collection<int, UserEquipment>
     */
    #[ORM\OneToMany(targetEntity: UserEquipment::class, mappedBy: 'user_id', orphanRemoval: true)]
    private Collection $userEquipment;

    /**
     * @var Collection<int, Notification>
     */
    #[ORM\OneToMany(targetEntity: Notification::class, mappedBy: 'user_id', orphanRemoval: true)]
    private Collection $notifications;

    public function __construct()
    {
        $this->UserSkill = new ArrayCollection();
        $this->userEquipment = new ArrayCollection();
        $this->notifications = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    public function setZipCode(string $zip_code): static
    {
        $this->zip_code = $zip_code;

        return $this;
    }

    public function getProfile(): ?Profile
    {
        return $this->profile;
    }

    public function setProfile(?Profile $profile): static
    {
        // unset the owning side of the relation if necessary
        if ($profile === null && $this->profile !== null) {
            $this->profile->setUserId(null);
        }

        // set the owning side of the relation if necessary
        if ($profile !== null && $profile->getUserId() !== $this) {
            $profile->setUserId($this);
        }

        $this->profile = $profile;

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
            $userSkill->setUserId($this);
        }

        return $this;
    }

    public function removeUserSkill(UserSkill $userSkill): static
    {
        if ($this->UserSkill->removeElement($userSkill)) {
            // set the owning side to null (unless already changed)
            if ($userSkill->getUserId() === $this) {
                $userSkill->setUserId(null);
            }
        }

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
            $userEquipment->setUserId($this);
        }

        return $this;
    }

    public function removeUserEquipment(UserEquipment $userEquipment): static
    {
        if ($this->userEquipment->removeElement($userEquipment)) {
            // set the owning side to null (unless already changed)
            if ($userEquipment->getUserId() === $this) {
                $userEquipment->setUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): static
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications->add($notification);
            $notification->setUserId($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): static
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUserId() === $this) {
                $notification->setUserId(null);
            }
        }

        return $this;
    }
}
