<?php

namespace App\Command;

use App\Entity\Equipment;
use App\Entity\Material;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:fetch-equipment',
    description: 'Insert generic instruments and fetch corresponding models and brands from API',
)]
class FetchEquipmentCommand extends Command
{
    // Instruments génériques les plus populaires à insérer
    private array $genericInstruments = [
        'Guitar', 'Bass', 'Drums', 'Piano', 'Keyboard', 'Violin', 'Saxophone', 
        'Trumpet', 'Flute', 'Clarinet', 'Cello', 'Synthesizer', 'Microphone'
    ];

    // Nombre de pages à parcourir
    private int $pagesToFetch = 10;

    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $this->insertGenericInstruments($io);
        $this->fetchEquipmentFromApi($io);

        $io->success('All generic instruments and corresponding equipment have been processed.');

        return Command::SUCCESS;
    }

    private function insertGenericInstruments(SymfonyStyle $io): void
    {
        foreach ($this->genericInstruments as $instrument) {
            $existingMaterial = $this->entityManager->getRepository(Material::class)->findOneBy(['name' => $instrument]);

            if (!$existingMaterial) {
                $material = new Material();
                $material->setName($instrument);
                $this->entityManager->persist($material);
                $io->success("Inserted material: $instrument");
            } else {
                $io->info("$instrument already exists in the database.");
            }
        }

        $this->entityManager->flush();
        $io->success('All generic instruments have been inserted or verified.');
    }

    private function fetchEquipmentFromApi(SymfonyStyle $io): void
    {
        $client = new \GuzzleHttp\Client(['verify' => false]);

        for ($page = 1; $page <= $this->pagesToFetch; $page++) {
            $io->section("Fetching page $page from Reverb API...");

            // Requête à l'API Reverb avec pagination
            $response = $client->request('GET', 'https://api.reverb.com/api/listings/all', [
                'headers' => [
                    'Authorization' => '%env(REVERB_API_KEY)%',
                    'Accept-Version' => '3.0',
                    'Accept' => 'application/json'
                ],
                'query' => [
                    'page' => $page,
                    'per_page' => 50
                ]
            ]);

            $responseBody = $response->getBody()->getContents();
            $data = json_decode($responseBody, true);

            if ($data === null) {
                throw new \Exception('Impossible de décoder la réponse JSON.');
            }

            if (isset($data['listings'])) {
                foreach ($data['listings'] as $listing) {
                    $brand = $listing['make'] ?? 'Unknown';
                    $model = $listing['title'] ?? 'No model';

                    $categoryName = $listing['categories'][0]['full_name'] ?? 'Unknown Category';

                    // Recherche d'un instrument générique qui correspond à la catégorie de l'API
                    $materialName = $this->matchGenericInstrument($categoryName);

                    if ($materialName && $categoryName !== 'Unknown Category') {
                        // Recherche du matériel correspondant dans la base de données
                        $material = $this->entityManager->getRepository(Material::class)->findOneBy(['name' => $materialName]);

                        // Créer un nouvel équipement
                        $equipment = new Equipment();
                        $equipment->setBrand($brand);
                        $equipment->setModel($model);
                        $equipment->setMaterial($material);

                        // Enregistrer l'équipement dans la base de données
                        $this->entityManager->persist($equipment);
                        $io->success("Added equipment: $brand $model (Material: $materialName)");
                    }
                }

                // Sauvegarder les changements dans la base de données
                $this->entityManager->flush();
                $io->success("Page $page fetched and saved to the database.");
            } else {
                $io->error("No equipment data found on page $page.");
            }
        }
    }

    private function matchGenericInstrument(string $categoryName): ?string
    {
        foreach ($this->genericInstruments as $instrument) {
            if (stripos($categoryName, $instrument) !== false) {
                return $instrument;
            }
        }
        return null;  // Si aucune correspondance n'est trouvée
    }
}
