<?php

namespace App\DataFixtures;

use App\Entity\Skill;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class SkillFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 1; $i <= 20; $i++) {
            $skill = new Skill();
            $skill->setName($faker->word(1));
            $skill->setDescription($faker->word(7));

            $skill->setSkillArea($this->getReference(SkillAreaFixtures::SKILL_AREA_REFERENCE . rand(1, 5)));

            $manager->persist($skill);
        }

        $manager->flush();
    }
    
    public function getDependencies()
    {
        return [
            SkillAreaFixtures::class,
        ];
    }
}
