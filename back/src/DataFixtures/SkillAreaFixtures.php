<?php

namespace App\DataFixtures;

use App\Entity\SkillArea;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class SkillAreaFixtures extends Fixture
{
    public const SKILL_AREA_REFERENCE = 'skill_area_';

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 1; $i <= 5; $i++) {
            $skillArea = new SkillArea();
            $skillArea->setName($faker->word(1) . ' Techniques');
            $this->addReference(self::SKILL_AREA_REFERENCE . $i, $skillArea);

            $manager->persist($skillArea);
        }

        $manager->flush();
    }
}
