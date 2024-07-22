<?php

// src/DataFixtures/UserFixtures.php
namespace App\DataFixtures;

use App\Entity\Profile;
use App\Entity\User;
use Faker;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{


    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail("user$i@collab.com");
            $user->setRoles(["ROLE_USER"]);
            $user->setUsername($faker->userName);
            $hashedPassword = $this->passwordHasher->hashPassword($user, 'password');
            $user->setPassword($hashedPassword);
            $user->setCountry($faker->country);
            $user->setCity($faker->city);
            $user->setZipCode($faker->countryCode);

            // Création du profil associé
            $profile = new Profile();
            $profile->setUserId($user);
            $profile->setBio("test bio");
            $profile->setAvatar("https://wallpapers-clan.com/wp-content/uploads/2023/01/rapper-style-pfp-1.jpg");

            $manager->persist($user);
            $manager->persist($profile);
        }

        $manager->flush();
    }
}
