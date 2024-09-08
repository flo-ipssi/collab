<?php

// src/DataFixtures/UserFixtures.php
namespace App\DataFixtures;

use App\Entity\Equipment;
use App\Entity\Material;
use App\Entity\Profession;
use App\Entity\Profile;
use App\Entity\User;
use App\Entity\UserEquipment;
use App\Entity\UserProfession;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker;

class UserFixtures extends Fixture implements DependentFixtureInterface
{

    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        // Materials and Professions existed
        $equipment = $manager->getRepository(Equipment::class)->findAll();
        $professions = $manager->getRepository(Profession::class)->findAll();
        
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail("user$i@collab.com");
            $user->setRoles(["ROLE_USER"]);
            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setUsername($faker->userName);
            $bytes = random_bytes(5);
            $user->setFolder(bin2hex($bytes));
            $hashedPassword = $this->passwordHasher->hashPassword($user, 'password');
            $user->setPassword($hashedPassword);
            $user->setCountry($faker->country);
            $user->setCity($faker->city);

            $profile = new Profile();
            $profile->setUserId($user);
            $profile->setBio("test bio");
            $profile->setAvatar("https://wallpapers-clan.com/wp-content/uploads/2023/01/rapper-style-pfp-1.jpg");

            $manager->persist($user);
            $manager->persist($profile);

            for ($k = 0; $k < rand(1, 2); $k++) {
                $userEquipment = new UserEquipment();
                $userEquipment->setUser($user);
                $userEquipment->setEquipment($equipment[array_rand($equipment)]);
                $userEquipment->setDetails($faker->word(6));
                $manager->persist($userEquipment);
            }
            
            for ($l = 0; $l < rand(1, 2); $l++) {
                $userProfession = new UserProfession();
                $userProfession->setUser($user);
                $userProfession->setProfession($professions[array_rand($professions)]);
                $manager->persist($userProfession);
            }
        }

        $manager->flush();
    }

    
    public function getDependencies()
    {
        return [
            MaterialFixtures::class,
            ProfessionFixtures::class,
        ];
    }
}
