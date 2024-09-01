<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240901153926 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE profession (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_profession (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, profession_id INT NOT NULL, INDEX IDX_1DF4CB85A76ED395 (user_id), INDEX IDX_1DF4CB85FDEF8996 (profession_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_profession ADD CONSTRAINT FK_1DF4CB85A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_profession ADD CONSTRAINT FK_1DF4CB85FDEF8996 FOREIGN KEY (profession_id) REFERENCES profession (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_profession DROP FOREIGN KEY FK_1DF4CB85A76ED395');
        $this->addSql('ALTER TABLE user_profession DROP FOREIGN KEY FK_1DF4CB85FDEF8996');
        $this->addSql('DROP TABLE profession');
        $this->addSql('DROP TABLE user_profession');
    }
}
