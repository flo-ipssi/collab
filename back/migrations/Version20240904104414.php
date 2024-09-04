<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240904104414 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE profile ADD instagram VARCHAR(255) DEFAULT NULL, ADD facebook VARCHAR(255) DEFAULT NULL, ADD deezer VARCHAR(255) DEFAULT NULL, ADD spotify VARCHAR(255) DEFAULT NULL, ADD apple_music VARCHAR(255) DEFAULT NULL, ADD tidal VARCHAR(255) DEFAULT NULL, ADD custom_site VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD firstname VARCHAR(255) NOT NULL, ADD lastname VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP firstname, DROP lastname');
        $this->addSql('ALTER TABLE profile DROP instagram, DROP facebook, DROP deezer, DROP spotify, DROP apple_music, DROP tidal, DROP custom_site');
    }
}
