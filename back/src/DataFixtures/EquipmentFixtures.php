<?php

namespace App\DataFixtures;

use App\Entity\Equipment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class EquipmentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $equipmentNames = [
            'Electric Guitar',
            'Acoustic Guitar',
            'Bass Guitar',
            'Keyboard',
            'Synthesizer',
            'Drum Kit',
            'Cymbals',
            'Microphone',
            'Mixer',
            'Amplifier',
            'Turntable',
            'Sampler',
            'Harmonica',
            'Violin',
            'Trumpet'
        ];

        foreach ($equipmentNames as $name) {
            $equipment = new Equipment();
            $equipment->setName($name);
            $equipment->setDescription($faker->words(8, true));

            $manager->persist($equipment);
        }

        $manager->flush();
    }
}
