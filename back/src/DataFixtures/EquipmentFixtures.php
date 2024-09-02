<?php

namespace App\DataFixtures;

use App\Entity\Equipment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class EquipmentFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 16; $i++) {
            $equipment = new Equipment();
            $equipment->setBrand($faker->company)
                ->setModel($faker->word)
                ->setMaterial($this->getReference(MaterialFixtures::MATERIAL_REFERENCE . $faker->numberBetween(0, 14)));

            $manager->persist($equipment);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            MaterialFixtures::class,
        ];
    }
}
