<?php

namespace App\DataFixtures;

use App\Entity\Profession;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProfessionFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $professions = [
            ['name' => 'Guitariste', 'description' => 'Joue de la guitare dans un groupe ou en solo.'],
            ['name' => 'Pianiste', 'description' => 'Spécialiste du piano, que ce soit en solo ou accompagnateur.'],
            ['name' => 'Chanteur', 'description' => 'Vocaliste qui peut performer en solo ou avec un groupe.'],
            ['name' => 'Batteur', 'description' => 'Joue de la batterie pour divers genres musicaux.'],
            ['name' => 'Bassiste', 'description' => 'Responsable des lignes de basse dans un groupe de musique.'],
            ['name' => 'Producteur', 'description' => 'Supervise et guide la production musicale.'],
            ['name' => 'DJ', 'description' => 'Crée et mixe de la musique pour des évènements.'],
            ['name' => 'Ingénieur du son', 'description' => 'Responsable du mixage et de la qualité sonore en studio ou en live.'],
            ['name' => 'Compositeur', 'description' => 'Écrit et compose de la musique.'],
        ];

        foreach ($professions as $profData) {
            $profession = new Profession();
            $profession->setName($profData['name']);
            $profession->setDescription($profData['description']);
            $manager->persist($profession);
        }

        $manager->flush();
    }
}
