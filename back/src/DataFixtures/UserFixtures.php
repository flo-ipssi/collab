<?php

// src/DataFixtures/UserFixtures.php
namespace App\DataFixtures;

use App\Entity\Equipment;
use App\Entity\Profession;
use App\Entity\Profile;
use App\Entity\Skill;
use App\Entity\User;
use App\Entity\UserEquipment;
use App\Entity\UserProfession;
use App\Entity\UserSkill;
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

        // Skills, Equipments and Professions existed
        $skills = $manager->getRepository(Skill::class)->findAll();
        $equipments = $manager->getRepository(Equipment::class)->findAll();
        $professions = $manager->getRepository(Profession::class)->findAll();
        
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

            $profile = new Profile();
            $profile->setUserId($user);
            $profile->setBio("test bio");
            $profile->setAvatar("https://wallpapers-clan.com/wp-content/uploads/2023/01/rapper-style-pfp-1.jpg");

            $manager->persist($user);
            $manager->persist($profile);

            
            for ($j = 0; $j < rand(1, 3); $j++) {
                $userSkill = new UserSkill();
                $userSkill->setUserId($user);
                $userSkill->setSkillId($skills[array_rand($skills)]);
                $manager->persist($userSkill);
            }

            for ($k = 0; $k < rand(1, 2); $k++) {
                $userEquipment = new UserEquipment();
                $userEquipment->setUserId($user);
                $userEquipment->setUserEquipment($equipments[array_rand($equipments)]);
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
            SkillFixtures::class,
            EquipmentFixtures::class,
            ProfessionFixtures::class,
        ];
    }
}
