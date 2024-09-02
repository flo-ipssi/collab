<?php

namespace App\DataFixtures;

use App\Entity\Material;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MaterialFixtures extends Fixture
{    
    public const MATERIAL_REFERENCE = 'material-';
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $materialNames = [
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

        foreach ($materialNames as $key => $name) {
            $material = new Material();
            $material->setName($name);
            $material->setDescription($faker->words(8, true));

            $manager->persist($material);

            
            $this->addReference(self::MATERIAL_REFERENCE . $key, $material);
        }

        $manager->flush();
    }
}
