<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240711222657 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE equipment (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, message LONGTEXT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_BF5476CA9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE profile (id INT AUTO_INCREMENT NOT NULL, user_id_id INT DEFAULT NULL, bio LONGTEXT DEFAULT NULL, avatar VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8157AA0F9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, skill_area_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_5E3DE477A7FADEB5 (skill_area_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_area (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_equipment (id INT AUTO_INCREMENT NOT NULL, user_equipment_id INT NOT NULL, user_id_id INT NOT NULL, details LONGTEXT DEFAULT NULL, INDEX IDX_D3D85867D1B395FC (user_equipment_id), INDEX IDX_D3D858679D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_skill (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, skill_id_id INT NOT NULL, level VARCHAR(255) DEFAULT NULL, INDEX IDX_BCFF1F2F9D86650F (user_id_id), INDEX IDX_BCFF1F2F5A6C0D6B (skill_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CA9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE profile ADD CONSTRAINT FK_8157AA0F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477A7FADEB5 FOREIGN KEY (skill_area_id) REFERENCES skill_area (id)');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D85867D1B395FC FOREIGN KEY (user_equipment_id) REFERENCES equipment (id)');
        $this->addSql('ALTER TABLE user_equipment ADD CONSTRAINT FK_D3D858679D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_skill ADD CONSTRAINT FK_BCFF1F2F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_skill ADD CONSTRAINT FK_BCFF1F2F5A6C0D6B FOREIGN KEY (skill_id_id) REFERENCES skill (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE notification DROP FOREIGN KEY FK_BF5476CA9D86650F');
        $this->addSql('ALTER TABLE profile DROP FOREIGN KEY FK_8157AA0F9D86650F');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477A7FADEB5');
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D85867D1B395FC');
        $this->addSql('ALTER TABLE user_equipment DROP FOREIGN KEY FK_D3D858679D86650F');
        $this->addSql('ALTER TABLE user_skill DROP FOREIGN KEY FK_BCFF1F2F9D86650F');
        $this->addSql('ALTER TABLE user_skill DROP FOREIGN KEY FK_BCFF1F2F5A6C0D6B');
        $this->addSql('DROP TABLE equipment');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE profile');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE skill_area');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_equipment');
        $this->addSql('DROP TABLE user_skill');
    }
}
